import { expect, test as base } from "@playwright/test";
import { LoginFixture, loginPageFixture } from "../fixtures/login.fixture";
import { createHtmlReport } from "axe-html-reporter";
import AxeBuilder from "@axe-core/playwright";

const test = base.extend<LoginFixture>({
  ...loginPageFixture,
});

test.describe("Login feature", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("@smoke - Login happy path", async ({ page, loginPage }) => {
    await expect(loginPage.getUserNameField).toBeVisible();
    await loginPage.getUserNameField.fill(`${process.env.TMT_USERNAME}`);
    await loginPage.getPasswordField.fill(`${process.env.TMT_PASSWORD}`);
    await loginPage.getSubmitButton.click();

    await expect(page).toHaveURL("https://d2yqnm7qbjnp0v.cloudfront.net/dashboard");
  });

  test("@accessibility - Login page accessiblity validation", async ({ page }) => {
    const accessiblityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .disableRules(["aria-valid-attr-value"])
      .analyze();

    (() => {
      createHtmlReport({
        results: accessiblityScanResults,
        options: {
          outputDir: "test-results/accessibility/login-page",
          reportFileName: "login-page-accessibility.html",
        },
      });
    })();

    expect(accessiblityScanResults.violations).toEqual([]);
  });
});
