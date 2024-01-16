import LoginPage from "../pageObjects/login.page";

export interface LoginFixture {
  loginPage: LoginPage;
}

export const loginPageFixture = {
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
};
