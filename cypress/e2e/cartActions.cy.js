import { homePage } from "./pages/homePage";
import { cartPage } from "./pages/cartPage";
import { checkoutPage } from "./pages/checkoutPage";
import productAssertions from "../fixtures/productsAssertions.json";
import homePageSelectors from "../fixtures/homePageSelectors.json";

describe('Cart Actions Test Suite', () => {
  let scope = {};
  let cartTotalItems = 1;
  let homePageActions = new homePage();
  let cartPageActions = new cartPage();
  let checkoutPageActions = new checkoutPage();

  beforeEach(() => {
    scope.baseUrl = Cypress.env('baseUrl');
    cy.viewport(1920, 1080);
  });

  it('Verify the application allows the user to add or remove products to the cart and valide the cart contents', () => {
    cy.visit('/');
    //Login to the application as the standard_user
    cy.login(Cypress.env('standard_user'), Cypress.env('valid_password'));

    //Add 'Sauce Labs Backpack' to cart
    homePageActions.addItemToCart(homePageSelectors.addToCartButtonBackpack);

    //Verify that cart count gets updated on the 'Cart' icon
    cy.readFile("cypress/fixtures/cartDetails.json", (err, data) => {
      if (err) {
        return console.error(err);
      }
    }).then((data) => {
      data.totalitems = cartTotalItems++;
      cy.log(data.totalitems);
      cy.writeFile("cypress/fixtures/cartDetails.json", JSON.stringify(data));
      cy.get('[data-test="shopping-cart-badge"]').invoke('text').then(current_cart_count => expect(current_cart_count).to.eq(JSON.stringify(data.totalitems))) //Verify the current cart count matches the totalitems counter implemented
    });

    //Add 'Sauce Labs Fleece Jacket' to cart
    homePageActions.addItemToCart(homePageSelectors.addToCartButtonFleeceJacket);

    //Verify that cart count gets updated on the 'Cart' icon
    cy.readFile("cypress/fixtures/cartDetails.json", (err, data) => {
      if (err) {
        return console.error(err);
      }
    }).then((data) => {
      data.totalitems = cartTotalItems++;
      cy.log(data.totalitems);
      cy.writeFile("cypress/fixtures/cartDetails.json", JSON.stringify(data));
      cy.get('[data-test="shopping-cart-badge"]').invoke('text').then(current_cart_count => expect(current_cart_count).to.eq(JSON.stringify(data.totalitems)))  //Verify the current cart count matches the totalitems counter implemented

    });

    //Add 'Sauce Labs Onesie' to cart    
    homePageActions.addItemToCart(homePageSelectors.addToCartButtonOnesie);

    //Verify that cart count gets updated on the 'Cart' icon
    cy.readFile("cypress/fixtures/cartDetails.json", (err, data) => {
      if (err) {
        return console.error(err);
      }
    }).then((data) => {
      data.totalitems = cartTotalItems++;
      cy.log(data.totalitems);
      cy.writeFile("cypress/fixtures/cartDetails.json", JSON.stringify(data));
      cy.get('[data-test="shopping-cart-badge"]').invoke('text').then(current_cart_count => expect(current_cart_count).to.eq(JSON.stringify(data.totalitems)))  //Verify the current cart count matches the totalitems counter implemented
    });

    //Navigate to the Cart page
    cy.get('[data-test="shopping-cart-link"]').click();

    //Verify the correct contents are added to the Cart
    cartPageActions.verifyCartContent(homePageSelectors.sauceLabsBackpack, productAssertions.sauceLabsBackpack);
    cartPageActions.verifyCartContent(homePageSelectors.sauceLabsFleeceJacket, productAssertions.sauceLabsFleeceJacket);
    cartPageActions.verifyCartContent(homePageSelectors.sauceLabsOnesie, productAssertions.sauceLabsOnesie);

    //Navigate back to the Home Page
    homePageActions.navigateToHomePage();

    //Remove 'Sauce Labs Onesie' from the cart    
    homePageActions.removeItemsFromCart(homePageSelectors.removeFromCartButtonOnesie);

    //Verify that cart count gets updated on the 'Cart' icon after removing item from Cart
    cy.readFile("cypress/fixtures/cartDetails.json", (err, data) => {
      if (err) {
        return console.error(err);
      }
    }).then((data) => {
      cartTotalItems = cartTotalItems - 2;
      data.totalitems = cartTotalItems;
      cy.log(data.totalitems);
      cy.writeFile("cypress/fixtures/cartDetails.json", JSON.stringify(data));
      cy.get('[data-test="shopping-cart-badge"]').invoke('text').then(current_cart_count => expect(current_cart_count).to.eq(JSON.stringify(data.totalitems)))  //Verify the current cart count matches the totalitems counter implemented
    });

    //Remove 'Sauce Labs Backpack' from the cart    
    homePageActions.removeItemsFromCart(homePageSelectors.removeFromCartButtonBackpack);

    //Verify that cart count gets updated on the 'Cart' icon after removing item from Cart
    cy.readFile("cypress/fixtures/cartDetails.json", (err, data) => {
      if (err) {
        return console.error(err);
      }
    }).then((data) => {
      cartTotalItems = cartTotalItems - 1;
      data.totalitems = cartTotalItems;
      cy.log(data.totalitems);
      cy.writeFile("cypress/fixtures/cartDetails.json", JSON.stringify(data));
      cy.get('[data-test="shopping-cart-badge"]').invoke('text').then(current_cart_count => expect(current_cart_count).to.eq(JSON.stringify(data.totalitems)))  //Verify the current cart count matches the totalitems counter implemented
    });

    //Add 'Sauce Labs Backpack' to cart
    homePageActions.addItemToCart(homePageSelectors.addToCartButtonBackpack);

    //Verify that cart count gets updated on the 'Cart' icon after adding the product back 
    cy.readFile("cypress/fixtures/cartDetails.json", (err, data) => {
      if (err) {
        return console.error(err);
      }
    }).then((data) => {
      data.totalitems = cartTotalItems + 1;
      cy.log(data.totalitems);
      cy.writeFile("cypress/fixtures/cartDetails.json", JSON.stringify(data));
      cy.get('[data-test="shopping-cart-badge"]').invoke('text').then(current_cart_count => expect(current_cart_count).to.eq(JSON.stringify(data.totalitems)))  //Verify the current cart count matches the totalitems counter implemented
    });

    //Navigate to the Cart page
    cy.get('[data-test="shopping-cart-link"]').click();

    //Verify the correct contents are added to the Cart
    cartPageActions.verifyCartContent(homePageSelectors.sauceLabsBackpack, productAssertions.sauceLabsBackpack);
    cartPageActions.verifyCartContent(homePageSelectors.sauceLabsFleeceJacket, productAssertions.sauceLabsFleeceJacket);
  })



  it("Verify the application doesn't allow the user to checkout if no user information is provided at checkout and verify the error messages", () => {
    cy.visit('/');
    //Login to the application as the standard_user
    cy.login(Cypress.env('standard_user'), Cypress.env('valid_password'));

    //Add 'Sauce Labs Backpack' to cart
    homePageActions.addItemToCart(homePageSelectors.addToCartButtonBackpack);

    //Verify that cart count gets updated on the 'Cart' icon
    cy.readFile("cypress/fixtures/cartDetails.json", (err, data) => {
      if (err) {
        return console.error(err);
      }
    }).then((data) => {
      data.totalitems = cartTotalItems++;
      cy.log(data.totalitems);
      cy.writeFile("cypress/fixtures/cartDetails.json", JSON.stringify(data));
      cy.get('[data-test="shopping-cart-badge"]').invoke('text').then(current_cart_count => expect(current_cart_count).to.eq(JSON.stringify(data.totalitems)))  //Verify the current cart count matches the totalitems counter implemented
    });

    //Add 'Sauce Labs Fleece Jacket' to cart
    homePageActions.addItemToCart(homePageSelectors.addToCartButtonFleeceJacket);

    //Verify that cart count gets updated on the 'Cart' icon
    cy.readFile("cypress/fixtures/cartDetails.json", (err, data) => {
      if (err) {
        return console.error(err);
      }
    }).then((data) => {
      data.totalitems = cartTotalItems++;
      cy.log(data.totalitems);
      cy.writeFile("cypress/fixtures/cartDetails.json", JSON.stringify(data));
      cy.get('[data-test="shopping-cart-badge"]').invoke('text').then(current_cart_count => expect(current_cart_count).to.eq(JSON.stringify(data.totalitems)))  //Verify the current cart count matches the totalitems counter implemented

    });

    //Add 'Sauce Labs Onesie' to cart    
    homePageActions.addItemToCart(homePageSelectors.addToCartButtonOnesie);

    //Verify that cart count gets updated on the 'Cart' icon
    cy.readFile("cypress/fixtures/cartDetails.json", (err, data) => {
      if (err) {
        return console.error(err);
      }
    }).then((data) => {
      data.totalitems = cartTotalItems++;
      cy.log(data.totalitems);
      cy.writeFile("cypress/fixtures/cartDetails.json", JSON.stringify(data));
      cy.get('[data-test="shopping-cart-badge"]').invoke('text').then(current_cart_count => expect(current_cart_count).to.eq(JSON.stringify(data.totalitems)))  //Verify the current cart count matches the totalitems counter implemented
    });

    //Navigate to the Cart page
    cy.get('[data-test="shopping-cart-link"]').click();

    //Verify the correct contents are added to the Cart
    cartPageActions.verifyCartContent(homePageSelectors.sauceLabsBackpack, productAssertions.sauceLabsBackpack);
    cartPageActions.verifyCartContent(homePageSelectors.sauceLabsFleeceJacket, productAssertions.sauceLabsFleeceJacket);
    cartPageActions.verifyCartContent(homePageSelectors.sauceLabsOnesie, productAssertions.sauceLabsOnesie);

    //Click on the 'Checkout' button 
    cy.get('[data-test="checkout"]').click();

    //Click on 'Continue' button without entering any contact information
    cy.get('[data-test="continue"]').click();

    //Verify error messages listed for the 'First Name', 'Last Name' and the 'Zip/Postal Code' fields respectively
    checkoutPageActions.verifyInvalidCheckout();

  })

  it("Verify the user is able to successfully checkout once valid details are provided and the user is able to see the order placed successfully confirmation page", () => {
    cartTotalItems = 1;
    cy.visit('/');
    //Login to the application as the standard_user
    cy.login(Cypress.env('standard_user'), Cypress.env('valid_password'));

    //Add 'Sauce Labs Backpack' to cart
    homePageActions.addItemToCart(homePageSelectors.addToCartButtonBackpack);

    //Verify that cart count gets updated on the 'Cart' icon
    cy.readFile("cypress/fixtures/cartDetails.json", (err, data) => {
      if (err) {
        return console.error(err);
      }
    }).then((data) => {
      data.totalitems = cartTotalItems++;
      cy.log(data.totalitems);
      cy.writeFile("cypress/fixtures/cartDetails.json", JSON.stringify(data));
      cy.get('[data-test="shopping-cart-badge"]').invoke('text').then(current_cart_count => expect(current_cart_count).to.eq(JSON.stringify(data.totalitems)))  //Verify the current cart count matches the totalitems counter implemented
    });

    //Add 'Sauce Labs Fleece Jacket' to cart
    homePageActions.addItemToCart(homePageSelectors.addToCartButtonFleeceJacket);

    //Verify that cart count gets updated on the 'Cart' icon
    cy.readFile("cypress/fixtures/cartDetails.json", (err, data) => {
      if (err) {
        return console.error(err);
      }
    }).then((data) => {
      data.totalitems = cartTotalItems++;
      cy.log(data.totalitems);
      cy.writeFile("cypress/fixtures/cartDetails.json", JSON.stringify(data));
      cy.get('[data-test="shopping-cart-badge"]').invoke('text').then(current_cart_count => expect(current_cart_count).to.eq(JSON.stringify(data.totalitems)))  //Verify the current cart count matches the totalitems counter implemented

    });

    //Add 'Sauce Labs Onesie' to cart    
    homePageActions.addItemToCart(homePageSelectors.addToCartButtonOnesie);

    //Verify that cart count gets updated on the 'Cart' icon
    cy.readFile("cypress/fixtures/cartDetails.json", (err, data) => {
      if (err) {
        return console.error(err);
      }
    }).then((data) => {
      data.totalitems = cartTotalItems++;
      cy.log(data.totalitems);
      cy.writeFile("cypress/fixtures/cartDetails.json", JSON.stringify(data));
      cy.get('[data-test="shopping-cart-badge"]').invoke('text').then(current_cart_count => expect(current_cart_count).to.eq(JSON.stringify(data.totalitems))) //Verify the current cart count matches the totalitems counter implemented
    });

    //Navigate to the Cart page    
    cy.get('[data-test="shopping-cart-link"]').click();

    //Verify the correct contents are added to the Cart
    cartPageActions.verifyCartContent(homePageSelectors.sauceLabsBackpack, productAssertions.sauceLabsBackpack);
    cartPageActions.verifyCartContent(homePageSelectors.sauceLabsFleeceJacket, productAssertions.sauceLabsFleeceJacket);
    cartPageActions.verifyCartContent(homePageSelectors.sauceLabsOnesie, productAssertions.sauceLabsOnesie);

    //Continue checkout
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="continue"]').click();

    //Enter valid details for the First Name', 'Last Name' and the 'Zip/Postal Code' fields and complete the checkout, and verify the order has been placed succesfully(by validating the success messages)
    checkoutPageActions.validCheckout();

  })


})