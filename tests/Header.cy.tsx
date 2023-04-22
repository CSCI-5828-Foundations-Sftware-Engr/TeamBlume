import React from 'react'
import Header from '../components/Header'

describe('Non loggedin user Header checks', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Header session={null}/>)
    cy.get('.global-header').should('exist');
    cy.get('.logo').should('exist');
    cy.get('.header-elements').should('not.exist');
  })
})