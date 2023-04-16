import React from 'react'
import Footer from '../components/Footer'

describe('<Footer />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Footer />)
    cy.get('.footer').contains('Copyright PACom')
  })
})