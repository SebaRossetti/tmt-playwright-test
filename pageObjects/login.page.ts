import { Page } from "@playwright/test";

export default class LoginPage {
  constructor(private page: Page) {}

  get getUserNameField() {
    return this.page.locator("label", { hasText: "UserName" });
  }

  get getPasswordField() {
    return this.page.locator("label", { hasText: "Password" });
  }

  get getSubmitButton() {
    return this.page.locator("button[type='submit']");
  }
}
