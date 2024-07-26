
//Custom command to automate the login function
Cypress.Commands.add("login", (username, password) => {
  cy.get('.login_logo').should('be.visible');
  cy.visit(Cypress.env('baseUrl'));
  cy.get('[data-test="username"]').type(username);
  cy.get('[data-test="password"]').type(password);
  cy.get('[data-test="login-button"]').click();
});

//Custom command to automate the logout function
Cypress.Commands.add("logout", () => {
  cy.get('[id="react-burger-menu-btn"]').click();
  cy.get('[data-test="logout-sidebar-link"]').click();
});