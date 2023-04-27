function loadPage(){
  cy.visit('localhost:3000');
}

function login(){
  //Login check with valid credentials
  cy.get(':nth-child(1) > .supabase-ui-auth_ui-input').type('fepasof271@jthoven.com');
  cy.get(':nth-child(2) > .supabase-ui-auth_ui-input').type('password');

  cy.get('.auth-widget').contains('Sign in').click();
}

describe('app loads spec', () => {

  it('passes', () => {
    cy.visit('localhost:3000');
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
    cy.contains('Login or signup to get started');
  })

})

describe('application page spec', () => {

  it('Login page loads properly', () => {
    cy.visit('localhost:3000');
    cy.get('.Logo').should('be.visible').contains('PACom');

    //Login form action buttons check
    cy.get('.auth-widget').contains('Sign in');
    cy.get('.auth-widget').contains('Forgot your password?');
    cy.get('.auth-widget').contains('Don\'t have an account? Sign up');

    //Login form input fields check
    cy.get('.auth-widget').contains('Email');
    cy.get('.auth-widget').contains('Password');

    //Login check with no credentials
    cy.get('.auth-widget').contains('Sign in').click();
    cy.get('.auth-widget').contains('Invalid login credentials');

    //Login check with valid credentials
    cy.get(':nth-child(1) > .supabase-ui-auth_ui-input').type('fepasof271@jthoven.com');
    cy.get(':nth-child(2) > .supabase-ui-auth_ui-input').type('password');
    
    cy.get('.auth-widget').contains('Sign in').click();

    //Check if user is logged in
    cy.wait(200).reload().get('.card-cat-component').should('be.visible');
    cy.get('.nav-buttons').should('be.visible');
    cy.get('.nav-buttons').find('button').click();
    cy.get('.header_dropdown_option').contains('Log Out');
    cy.get('.header_dropdown_option').contains('Account');

  })

})

describe('log out functionality spec', () => {

  it('Logout works properly', () => {

    loadPage();
    login();



    //Check if user is logged in
    cy.wait(200).reload().get('.card-cat-component').should('be.visible');
    cy.get('.nav-buttons').find('button').click();
    cy.get('.header_dropdown_option').contains('Log Out');

    cy.get('.header_dropdown_option').contains('Log Out').click();
    cy.get('.auth-widget').contains('Sign in').click();



  })

})

describe('category specific products page test spec', () => {

  it('Products page loads properly', () => {

    loadPage();
    login();

    //wait for category components to load
    cy.wait(200).reload().get('.card-cat-component').should('be.visible');
    cy.get('.card-cat-component').contains('Grocery');
    cy.get('.card-cat-component').contains('Electronics');
    cy.get('.card-cat-component').contains('Electronics').click();

    //wait for products to load
    cy.get('.product-grid').should('be.visible');
    cy.get('.product-grid').find('.product-card').should('have.length.at.least', 1);

  })

})

describe('product specific page tests spec', () => {

  it('Product page loads properly from category products page', () => {

    loadPage();
    login();

    //wait for category components to load
    cy.wait(200).reload().get('.card-cat-component').should('be.visible');
    cy.get('.card-cat-component').contains('Grocery');
    cy.get('.card-cat-component').contains('Electronics');
    cy.get('.card-cat-component').contains('Electronics').click();

    //wait for products to load
    cy.get('.product-grid').should('be.visible');
    cy.get('.product-grid').get('.cat-product-button').last().click();

    //wait for product page to load
    cy.get('.product-detail-grid').should('be.visible');
    cy.get('.product-detail-grid').find('.product-detail-title').should('be.visible');
    cy.get('.product-detail-grid').find('.product-detail-brand').should('be.visible');
    cy.get('.product-detail-grid').find('.product-detail-img').should('be.visible');

    cy.wait(200).get('.product-details').should('be.visible');

  })

  it('Product page contians prices from various stores', () => {

    loadPage();
    login();

    //wait for category components to load
    cy.wait(200).reload().get('.card-cat-component').should('be.visible');
    cy.get('.card-cat-component').contains('Grocery');
    cy.get('.card-cat-component').contains('Electronics');
    cy.get('.card-cat-component').contains('Electronics').click();

    //wait for products to load
    cy.get('.product-grid').should('be.visible');
    cy.get('.product-grid').get('.cat-product-button').last().click();

    //wait for product page to load
    cy.get('.product-detail-grid').should('be.visible');

    //wait for product prices to load
    cy.wait(200).get('.product-details').should('be.visible');

    //check if product prices are visible
    cy.get('.product-details').find('.product-price').should('be.visible');
    cy.get('.product-details').find('.platform').should('be.visible');
    cy.get('.product-details').find('.product-price').should('have.length.at.least', 1);
    cy.get('.product-details').contains('Buy Now');

  })

})