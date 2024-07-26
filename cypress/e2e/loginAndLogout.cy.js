import { homePage } from "./pages/homePage";

describe('Login Logout Functions Test Suite', () => {
  let scope = {};
  let homePageActions = new homePage();

  beforeEach(() => {
    scope.baseUrl = Cypress.env('baseUrl');
    cy.viewport(1920, 1080);
  });

  it('Verify a standard user is able to login to the application and verify that the login was successful', () => {
    cy.visit('/');

    //Login to the application as the standard_user
    cy.login(Cypress.env('standard_user'), Cypress.env('valid_password'));

    //Verify the user is able to successfully login and validate the landing page elements
    homePageActions.verifyLogin();
  })


  it("Verify the application doesn't allow a user with invalid credentials to login and validate the error messages", () => {
    cy.visit('/');

    //Login to the application as an invalid user
    cy.login(Cypress.env('standard_user'), Cypress.env('invalid_password'));

    //Verify the user is not able to login and validate the error messages
    homePageActions.verifyinvalidLogin();
  })

  it('Verify a standard user is able to logout of the application and verify that the logout was successful', () => {
    cy.visit('/');

    //Login to the application as the standard_user
    cy.login(Cypress.env('standard_user'), Cypress.env('valid_password'));

    //Verify the user is able to successfully login and validate the landing page elements
    homePageActions.verifyLogin();

    //Logout of the application
    cy.logout();

    //Verify the user was logged out succssfully
    homePageActions.verifyLogout()

  })
})