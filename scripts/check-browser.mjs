import assert from 'node:assert/strict';
import http from 'node:http';
import { chromium } from 'playwright';
(async () => {
  // Wait for the static server before starting; CI starts it in the background.
  for (let attempt = 0; ; attempt++) {
    try {
      await new Promise((resolve, reject) => {
        const request = http.get('http://127.0.0.1:4173', response => {
          response.resume();
          response.on('end', () => response.statusCode === 200 ? resolve() : reject(new Error('Server not ready')));
          response.on('error', reject);
        });
        request.on('error', reject);
        request.setTimeout(2000, () => request.destroy(new Error('Server timeout')));
      });
      break;
    }
    catch (error) { if (attempt >= 30) throw error; await new Promise(resolve => setTimeout(resolve, 200)); }
  }
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const [width, height] of [[320, 900], [375, 900], [667, 375], [768, 900], [1024, 900], [1440, 900]]) {
      await page.setViewportSize({ width, height });
      await page.goto('http://127.0.0.1:4173');
      await page.locator('#contact').scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);
      const overflow = await page.evaluate(() => ({
        viewport: innerWidth, width: document.documentElement.scrollWidth,
        elements: [...document.querySelectorAll('body *')].filter(el => { const box = el.getBoundingClientRect(); return box.width && (box.right > innerWidth + 1 || box.left < -1); }).slice(0, 12).map(el => ({ tag: el.tagName, className: el.className, right: el.getBoundingClientRect().right })),
      }));
      assert.ok(overflow.width <= overflow.viewport, `Overflow at ${width}px: ${JSON.stringify(overflow)}`);
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.locator('form').getAttribute('method'), 'POST');
      assert.equal(await page.locator('form').getAttribute('action'), 'https://formsubmit.co/zainh0277@gmail.com');
      await page.getByLabel('Your Name', { exact: true }).fill('Validation test');
      await page.getByLabel('Email Address', { exact: true }).fill('invalid-email');
      assert.equal(await page.locator('form').evaluate(form => form.checkValidity()), false);
      await page.getByLabel('Email Address', { exact: true }).fill('test@example.com');
      await page.getByLabel('Message', { exact: true }).fill('Browser validation only, no email sent.');
      assert.equal(await page.locator('form').evaluate(form => form.checkValidity()), true);
      if (width < 768) {
        const toggle = page.getByRole('button', { name: 'Toggle menu' });
        await toggle.click();
        assert.equal(await toggle.getAttribute('aria-expanded'), 'true');
        await page.locator('#mobile-menu a[href="#services"]').click();
        assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
      }
      console.log(`PASS: ${width}x${height} layout, form validation and navigation`);
    }
    for (const width of [375, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('http://127.0.0.1:4173');
      const cards = page.locator('#projects button[aria-label^="Read "]');
      assert.equal(await cards.count(), 5);
      for (let index = 0; index < 5; index++) {
        const card = cards.nth(index);
        await card.click();
        const dialog = page.getByRole('dialog');
        await dialog.waitFor({ state: 'visible' });
        assert.equal(await dialog.getByRole('heading', { name: 'Problem statement' }).count(), 1);
        assert.equal(await dialog.getByRole('heading', { name: 'Solution approach' }).count(), 1);
        for (const name of ['1. Overview', '2. Performance', '3. Action Detail']) {
          const view = dialog.getByRole('button', { name, exact: true });
          await view.click();
          assert.equal(await view.getAttribute('aria-pressed'), 'true');
          assert.equal(await dialog.locator('figure img').evaluate(async img => { await img.decode(); return img.naturalWidth > 0; }), true);
          assert.ok((await dialog.locator('figcaption').innerText()).length > 50);
        }
        assert.equal(await dialog.evaluate(el => el.scrollWidth <= el.clientWidth), true, `Dialog overflow at ${width}px`);
        const dataset = await dialog.getByRole('link', { name: 'Download sample data (JSON)' }).getAttribute('href');
        const response = await page.request.get(`http://127.0.0.1:4173${dataset}`);
        assert.equal(response.ok(), true);
        assert.equal((await response.json()).records.length, 6);
        await page.keyboard.press('Escape');
        await dialog.waitFor({ state: 'detached' });
        assert.equal(await card.evaluate(el => el === document.activeElement), true, 'Restore focus to project card');
      }
      await page.locator('#projects').getByRole('button', { name: 'Agriculture', exact: false }).click();
      await page.waitForFunction(() => document.querySelectorAll('#projects button[aria-label^="Read "]').length === 1);
      assert.equal(await cards.count(), 1);
      await page.locator('#projects').getByRole('button', { name: 'All', exact: false }).click();
      assert.equal(await cards.count(), 5);
      console.log(`PASS: ${width}px five project dialogs, 15 images, captions, data downloads, filters and focus restoration`);
    }
    assert.deepEqual(errors, []);
    // Deliberately do not send external messages. Inbox delivery is a separate launch gate.
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
