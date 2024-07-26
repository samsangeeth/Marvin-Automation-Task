import { GenericFunctions } from "../util/genericFunctions"
const genericFunctions = new GenericFunctions();

let firstName = genericFunctions.getFirstName();
let lastName = genericFunctions.getlastName();
let zipCode = genericFunctions.getZipCode();
let finalTotal;

class checkoutPage {
  //Invalid Checkout Scenario
  verifyInvalidCheckout() {
    cy.get('[data-test="error"]').should('be.visible').and('have.text', 'Error: First Name is required');
    cy.get('[data-test="firstName"]').type(firstName);

    cy.get('[data-test="continue"]').click();

    cy.get('[data-test="error"]').should('be.visible').and('have.text', 'Error: Last Name is required');
    cy.get('[data-test="lastName"]').type(lastName);

    cy.get('[data-test="continue"]').click();

    cy.get('[data-test="error"]').should('be.visible').and('have.text', 'Error: Postal Code is required');
  }

  //Successful Checkout Scenario
  validCheckout() {
    cy.get('[data-test="firstName"]').type(firstName);
    cy.get('[data-test="lastName"]').type(lastName);
    cy.get('[data-test="postalCode"]').type(zipCode);

    cy.get('[data-test="continue"]').click();
    
    cy.get('[data-test="title"]').should('have.text', 'Checkout: Overview');
    cy.get('[data-test="cart-list"]').should('be.visible');
    cy.get('[data-test="payment-info-label"]').should('be.visible');
    cy.get('[data-test="payment-info-value"]').should('be.visible');
    cy.get('[data-test="shipping-info-label"]').should('be.visible');
    cy.get('[data-test="shipping-info-value"]').should('be.visible');
    cy.get('[data-test="total-info-label"]').should('be.visible');
    cy.get('[data-test="subtotal-label"]').should('be.visible');
    cy.get('[data-test="tax-label"]').should('be.visible');
    cy.get('[data-test="total-label"]').should('be.visible');

    cy.get('[data-test="finish"]').click();

    cy.get('[data-test="pony-express"]').should('be.visible');
    cy.get('[data-test="complete-header"]').should('be.visible').and('have.text', 'Thank you for your order!');
    cy.get('[data-test="complete-text"]').should('be.visible').and('have.text', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!');

    cy.get('[data-test="back-to-products"]').should('be.visible').click();

    cy.url().should('include', '/inventory.html');

  }

}
export { checkoutPage };
