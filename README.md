
# Marvin Automation Task

 Automation for https://www.saucedemo.com/ page as per https://docs.google.com/document/d/1gtX8gAJxuCiYTj5uasBdPBH6-hQnRTd6VzY0m1VanoQ/edit?usp=sharing.


## Installation

Install cypress with npm:

```bash
npm install cypress --save-dev

```

Since faker.js is added as a dependency, install FakerJS with npm:

```bash
npm i @faker-js/faker
```
    
## Running Tests

To run tests, run the following command to open Cypress and choose the spec file:

```bash
  npx cypress open
```


## Automation Approach & Folder Structure

The current code structure is implemented using the Page Object Model (POM) structure. Simply put, the Page Object Model refers to using the Objects/Classes to depict and represent all the locators and functions (Components used for the automation) related to that particular page in a web application. 

Here are the two main benefits of using a Page Object Model:

- Code Reusability 
- Code Maintainability 



The following is the folder structure of the code base:

```
├── cypress
│   ├── downloads
│   ├── e2e
│   │   ├── pages
│   │   └── util
│   ├── fixtures
│   └── support
│       └── commands.js
│
├── .cypress.config.js
├── cypress.env.json
├── package-lock.json
├── package.json
└── README.md
```

- All the spec files created are listed under the `e2e` folder.
- The `pages` folder contains the objects for each individual page of the application wrt to POM.
- The `util` folder contains genericFunction and other generic actions that can be used throught the project.
- All the custom commands implemented are added under `commands.js`.
- The `cypress.env.json` file has been created to handle all the environment variables.




## Spec Files

- `cartActions.cy.js`
Test suite contains automation for all actions related to cart activities (Adding contents to the cart, Removing contents from the cart, Verify cart count gets updated after adding and removing items, Verify correct items are added to cart, Successful checkout, Unsuccessful checkout and other error message validations) 

- `loginAndLogout.cy.js`
Test suite contains automation for all actions related to login and logout (Successful login, Successful logout and error message validations for invalid login credentials)

- `menuNavigation.cy.js`
Test suite contains automation for all actions related to menu navigation (Navigate through every page listed in the application including the detailed product page for each individual product, Verify the details listed for each product are displayed correctly, Reset app state action, etc.)

- `productsSorting.cy.js`
Test suite contains automation for all actions related to product sorting (Implement all possible sorting scenarios and verify the listed items are sorted correctly)

