import { homePage } from "./pages/homePage";
import homePageSelectors from "../fixtures/homePageSelectors.json";

describe('Menu Navigation Functions Test Suite', () => {
  let scope = {};
  let homePageActions = new homePage();

  beforeEach(() => {
    scope.baseUrl = Cypress.env('baseUrl');
    cy.viewport(1920, 1080);
  });

  it('Verify a standard user is able to login to the application and navigate through every page successfully', () => {
    cy.visit('/');

    //Login to the application as the standard_user
    cy.login(Cypress.env('standard_user'), Cypress.env('valid_password'));

    //Verify the user is able to successfully login and validate the landing page elements
    homePageActions.verifyLogin();

    //Navigate to the product page of each item listed in the homepage and verify if all the details are listed correctly
    homePageActions.navigateToProductPage(homePageSelectors.sauceLabsBackpackImg);
    homePageActions.navigateToProductPage(homePageSelectors.sauceLabsBikeLightImg);
    homePageActions.navigateToProductPage(homePageSelectors.sauceLabsBoltTshirtImg);
    homePageActions.navigateToProductPage(homePageSelectors.sauceLabsFleeceJacket);
    homePageActions.navigateToProductPage(homePageSelectors.sauceLabsOnesieImg);
    homePageActions.navigateToProductPage(homePageSelectors.sauceLabsRedShirtImg);

    //Add 'Sauce Labs Backpack' to cart
    homePageActions.addItemToCart(homePageSelectors.addToCartButtonBackpack);

    //Reset the application state and verify that all the contents from the Cart are removed
    homePageActions.resetAppState();

    //Navigate to the 'About' page and verify the user is redirected to the correct page
    homePageActions.navigateToAboutPage();


  })
})