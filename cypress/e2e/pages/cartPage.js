

class cartPage {
  //Verify the item details listed in the Cart matches the details in the Products Page
  verifyCartContent(selector, value) {
    cy.url().should('include', '/cart.html')
    cy.get(selector).should('have.text', value);
  }
}
export { cartPage };
