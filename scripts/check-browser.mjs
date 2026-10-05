import assert from 'node:assert/strict';
import { chromium } from 'playwright';
(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const width of [320, 375, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('http://127.0.0.1:4173');
      await page.locator('#contact').scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `Overflow at ${width}px`);
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.locator('form').getAttribute('method'), 'POST');
      assert.equal(await page.locator('form').getAttribute('action'), 'https://formsubmit.co/zainh0277@gmail.com');
      await page.getByLabel('Your Name', { exact: true }).fill('Validation test');
      await page.getByLabel('Email Address', { exact: true }).fill('invalid-email');
      assert.equal(await page.locator('form').evaluate(form => form.checkValidity()), false);
      if (width < 768) {
        const toggle = page.getByRole('button', { name: 'Toggle menu' });
        await toggle.click();
        assert.equal(await toggle.getAttribute('aria-expanded'), 'true');
        await page.locator('#mobile-menu a[href="#services"]').click();
        assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
      }
      console.log(`PASS: ${width}px layout, form validation and navigation`);
    }
    assert.deepEqual(errors, []);
    // Deliberately do not send external messages. Inbox delivery is a separate launch gate.
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
