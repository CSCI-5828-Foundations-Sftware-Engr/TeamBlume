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
    cy.get('.category-dropdown').should('be.visible');
    // cy.get('nav-buttons').should('be.visible');
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
    cy.get('.category-dropdown').should('be.visible');
    cy.get('.nav-buttons').find('button').click();
    cy.get('.header_dropdown_option').contains('Log Out');

    cy.get('.header_dropdown_option').contains('Log Out').click();
    cy.get('.auth-widget').contains('Sign in').click();



  })

})