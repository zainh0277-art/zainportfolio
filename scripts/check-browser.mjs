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
    assert.deepEqual(errors, []);
    // Deliberately do not send external messages. Inbox delivery is a separate launch gate.
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
