// Selenium primer:
// - Selenium drives a real browser via the WebDriver protocol. Here we use ChromeDriver.
// - You build a `driver`, tell it which browser to control, open pages, locate elements, and make assertions.
// - Locators: By.id / By.css / By.xpath, etc. Use stable attributes (ids/data-testid) to avoid flakiness.
// - Waits: `driver.wait(until...)` keeps tests reliable by pausing until the page shows what you need.
// - Cleanup: Always `quit()` the driver so Chrome processes don't linger.

import assert from 'node:assert/strict';
import { before, afterEach, describe, it } from 'node:test';
import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

// Target URL and run mode; override with env vars when you point at dev/stage.
const baseUrl = process.env.E2E_BASE_URL || 'http://localhost:5173';
const headful = process.env.E2E_HEADFUL === 'true';
const slowMoMs = Number(process.env.E2E_SLOWMO_MS ?? (headful ? 500 : 0)); // add a small delay in headful mode so you can watch steps
const timeoutMs = 10000; // default explicit wait

let driver;

// Driver factory: configures Chrome with headless/headful modes.
const buildDriver = async () => {
	const options = new chrome.Options();
	if (!headful) {
		options.addArguments('--headless=new'); // headless keeps CI lightweight
	}
	options.addArguments('--window-size=1280,800');

	return new Builder()
		.forBrowser('chrome')
		.setChromeOptions(options)
		.build();
};



before(() => {
	// Guard so the test fails loudly if you forget to pass a target URL.
	assert.ok(baseUrl, 'Set E2E_BASE_URL to point at the running frontend');
});

afterEach(async () => {
	// Always stop the browser after each test to avoid cross-test interference.
	if (driver) {
		await driver.quit();
		driver = null;
	}
});

describe('Home page', () => {
	// Purpose: Ensure the landing hero renders so the main marketing message is visible.
	it('shows the hero headline', async () => {
		driver = await buildDriver();
		await driver.get(`${baseUrl}/`); // Step 1: navigate
		if (slowMoMs > 0) await driver.sleep(slowMoMs);

		// Step 2: wait for the hero headline to exist (explicit wait beats sleep()).
		const heroHeading = await driver.wait(
			until.elementLocated(By.xpath("//h1[contains(., 'Completing Your Home Decor Search')]")),
			timeoutMs
		);
		await driver.wait(until.elementIsVisible(heroHeading), timeoutMs); // ensure it is painted

		// Step 3: assert on the text.
		const text = await heroHeading.getText();
		assert.ok(
			text.toLowerCase().includes('completing your home decor search'),
			"Hero headline should mention 'Completing Your Home Decor Search'"
		);
	});

	// Purpose: Validate the primary CTA takes users into the shopping flow.
	it('navigates to shop via CTA', async () => {
		driver = await buildDriver();
		await driver.get(`${baseUrl}/`);
		if (slowMoMs > 0) await driver.sleep(slowMoMs);

		// Locate the CTA by visible text; XPath works when there is no stable id yet.
		const shopButton = await driver.wait(
			until.elementLocated(By.xpath("//button[contains(., 'Shop Now')]")),
			timeoutMs
		);
		if (slowMoMs > 0) await driver.sleep(slowMoMs);
		await shopButton.click();

		// Wait for the URL to change to /shop (simple navigation assertion).
		await driver.wait(async () => (await driver.getCurrentUrl()).includes('/shop'), timeoutMs);

		// Confirm the shop page rendered by checking its heading.
		const shopHeading = await driver.wait(
			until.elementLocated(By.xpath("//h1[contains(., 'Shop Online')]")),
			timeoutMs
		);
		if (slowMoMs > 0) await driver.sleep(slowMoMs);
		

		const text = await shopHeading.getText();
		assert.ok(text.includes('Shop Online'));
	});
});

// Purpose: Category cards on the home page should deep-link to the correct category listing.
describe('Home categories route to category pages', () => {
	it('opens Canvas Paintings category and shows products', async () => {
		driver = await buildDriver();
		await driver.get(`${baseUrl}/`);
		if (slowMoMs > 0) await driver.sleep(slowMoMs);

		// Click the Canvas Paintings card (uses the visible heading text).
		const categoryCard = await driver.wait(
			until.elementLocated(By.xpath("//h3[contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'canvas paintings')]")),
			timeoutMs
		);
		await driver.wait(until.elementIsVisible(categoryCard), timeoutMs);
		if (slowMoMs > 0) await driver.sleep(slowMoMs);
		await categoryCard.click();

		// Wait for URL and heading on the category page.
		await driver.wait(async () => (await driver.getCurrentUrl()).includes('/category/canvas-paintings'), timeoutMs);
		const heading = await driver.wait(
			until.elementLocated(By.xpath("//h1")),
			timeoutMs
		);
		await driver.wait(until.elementIsVisible(heading), timeoutMs);
		if (slowMoMs > 0) await driver.sleep(slowMoMs);

		// Verify at least one product link renders for this category.
		const productLink = await driver.wait(
			until.elementLocated(By.xpath("//a[contains(@href, '/product/')]")),
			timeoutMs
		);
		assert.ok(await productLink.getAttribute('href'));
	});
});

// Purpose: Direct navigation to /shop should render catalog UI (heading, sort control, and product cards).
describe('Shop page', () => {
	it('shows products and sorting control', async () => {
		driver = await buildDriver();
		await driver.get(`${baseUrl}/shop`);
		if (slowMoMs > 0) await driver.sleep(slowMoMs);

		const heading = await driver.wait(
			until.elementLocated(By.xpath("//h1[contains(., 'Shop')]")),
			timeoutMs
		);
		await driver.wait(until.elementIsVisible(heading), timeoutMs);

		const sortTrigger = await driver.wait(
			until.elementLocated(By.xpath("//button[contains(., 'sorting')]")),
			timeoutMs
		);
		await driver.wait(until.elementIsVisible(sortTrigger), timeoutMs);

		const firstProduct = await driver.wait(
			until.elementLocated(By.xpath("//a[contains(@href, '/product/')]")),
			timeoutMs
		);
		assert.ok(await firstProduct.getAttribute('href'));
	});
});

// Purpose: Product detail view should load when a product card is opened from the shop page.
describe('Product detail', () => {
	it('opens a product page from the shop grid', async () => {
		driver = await buildDriver();
		await driver.get(`${baseUrl}/shop`);
		if (slowMoMs > 0) await driver.sleep(slowMoMs);

		const firstProduct = await driver.wait(
			until.elementLocated(By.xpath("//a[contains(@href, '/product/')]")),
			timeoutMs
		);
		await driver.wait(until.elementIsVisible(firstProduct), timeoutMs);
		if (slowMoMs > 0) await driver.sleep(slowMoMs);
		await firstProduct.click();

		// If navigation pops a new tab/window, switch to it.
		const handles = await driver.getAllWindowHandles();
		if (handles.length > 1) {
			await driver.switchTo().window(handles[handles.length - 1]);
		}

		await driver.wait(async () => (await driver.getCurrentUrl()).includes('/product/'), timeoutMs);

		const nameHeading = await driver.wait(
			until.elementLocated(By.xpath("//h1")),
			timeoutMs
		);
		await driver.wait(until.elementIsVisible(nameHeading), timeoutMs);

		assert.ok(await nameHeading.getText());
	});
});
