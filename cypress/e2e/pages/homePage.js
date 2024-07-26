class homePage {
  //Verify valid login
  verifyLogin() {
    cy.url().should('include', '/inventory.html')
    cy.get('.app_logo').should('be.visible');
    cy.get('[data-test="inventory-container"]').should('be.visible');
    cy.get('[data-test="shopping-cart-link"]').should('be.visible');
    cy.get('[id="react-burger-menu-btn"]').click();
    cy.get('[data-test="logout-sidebar-link"]').should('be.visible').and('have.text', 'Logout');
    cy.get('[id="react-burger-cross-btn"]').click();
  }

  //Verify invalid login
  verifyinvalidLogin() {
    cy.get('[data-test="error"]').should('be.visible').and('have.text', 'Epic sadface: Username and password do not match any user in this service');
    cy.get('[data-icon="times-circle"]').should('be.visible');
  }

  //Verify logout
  verifyLogout() {
    cy.url().should('not.contain', '/inventory.html')
    cy.url().should('contain', 'https://www.saucedemo.com/')
    cy.get('.login_logo').should('be.visible');
    cy.get('[data-test="login-container"]').should('be.visible');
    cy.get('[data-test="login-button"]').should('be.visible');
    cy.get('.login_credentials_wrap-inner').should('be.visible');
  }

  //Add item to Cart passed as 'itemSelector'
  addItemToCart(itemSelector) {
    cy.get(itemSelector).should('have.text', 'Add to cart').click();
    // cy.get(`${itemSelector}`).should('have.text', 'Remove');
    cy.get('[data-test="shopping-cart-badge"]').should('be.visible');
  }

  //Remove item from the Cart passed as 'itemSelector'
  removeItemsFromCart(itemSelector) {
    cy.get(itemSelector).should('have.text', 'Remove').click();
    // cy.get(`${itemSelector}`).should('have.text', 'Remove');
    cy.get('[data-test="shopping-cart-badge"]').should('be.visible');
  }

  //Update the cart count when an item is added
  updateCartCount(count) {
    cy.readFile("cypress/fixtures/cartDetails.json", (err, data) => {
      if (err) {
        return console.error(err);
      }
    }).then((data) => {
      data.totalitems = count++;
      cy.log(data.totalitems);
      cy.writeFile("cypress/fixtures/cartDetails.json", JSON.stringify(data));
    });
  }

  //Navigate to Home Page
  navigateToHomePage(){
    cy.get('[id="react-burger-menu-btn"]').click();
    cy.get('[data-test="inventory-sidebar-link"]').click();
  }

  //Reset the app state
  resetAppState(){
    cy.get('[id="react-burger-menu-btn"]').click();
    cy.get('[data-test="reset-sidebar-link"]').click();
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
    cy.get('[id="react-burger-cross-btn"]').click();
  }

  //Navigate to About Page
  navigateToAboutPage(){
    cy.get('[id="react-burger-menu-btn"]').click();
    cy.get('[data-test="about-sidebar-link"]').click();
    cy.url().should('include', 'https://saucelabs.com/');

  }

  //Navigate to Product Page
  navigateToProductPage(selector){
    cy.get(selector).click();
    cy.get('[data-test="inventory-container"]').should('be.visible');
    cy.get('[data-test="inventory-item-name"]').should('be.visible');
    cy.get('[data-test="inventory-item-desc"]').should('be.visible');
    cy.get('[data-test="inventory-item-price"]').should('be.visible');
    cy.get('[data-test="add-to-cart"]').should('be.visible');
    cy.get('[data-test="back-to-products"]').click();
  }

  //Sort contents listed based on the 'sortMethod' provided
  sortContents(sortMethod){
    cy.get('[data-test="product-sort-container"]').select(sortMethod);
  }

  //Validate the sorting implemented based wrt to the 'sortField' provided
  validateSorting(sortField) {
    cy.get(sortField).then(($elements) => {
      const strings = [...$elements].map((el) => el.innerText.toLowerCase());
      cy.wrap(strings).should("equal", strings.sort());
    });
  }

}
export { homePage };
