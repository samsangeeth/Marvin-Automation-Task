import { homePage } from "./pages/homePage";
import homePageSelectors from "../fixtures/homePageSelectors.json";

describe('Products Sorting Functions Test Suite', () => {
  let scope = {};
  let homePageActions = new homePage();

  beforeEach(() => {
    scope.baseUrl = Cypress.env('baseUrl');
    cy.viewport(1920, 1080);
  });

  it('Verify a standard user is able sort the prodcuts in the page successfully', () => {
    cy.visit('/');
    //Login to the application as the standard_user
    cy.login(Cypress.env('standard_user'), Cypress.env('valid_password'));

    //Verify the user is able to successfully login and validate the landing page elements
    homePageActions.verifyLogin();

    //Sort the contents in the Descending order wrt the 'Name' field (Name Z to A)
    homePageActions.sortContents(1);
    //Verify the elements are sorted correctly
    homePageActions.validateSorting(homePageSelectors.itemNameSelector);

    //Sort the contents in the Ascending order wrt the 'Price' field (Price low to high)
    homePageActions.sortContents(2);
    //Verify the elements are sorted correctly
    homePageActions.validateSorting(homePageSelectors.itemPriceSelector);

    //Sort the contents in the Descending order wrt the 'Price' field (Price high to low)
    homePageActions.sortContents(3);
    //Verify the elements are sorted correctly
    homePageActions.validateSorting(homePageSelectors.itemPriceSelector);

    //Sort the contents in the Ascending order wrt the 'Name' field (Name A to Z) [Default Sorting]
    homePageActions.sortContents(0);
    //Verify the elements are sorted correctly
    homePageActions.validateSorting(homePageSelectors.itemNameSelector);

  })
})