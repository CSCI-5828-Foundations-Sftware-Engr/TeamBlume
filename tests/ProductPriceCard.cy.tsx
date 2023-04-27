import React from 'react'
import ProductPriceCard from '../components/ProductPriceCard'

describe('ProductPriceCard loads properly', () => {
  it('renders with all the details', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ProductPriceCard name={'test-product'} price={'100.93'} rating={'4.96'} num_reviews={'234'} product_link={'app.here'} platform={'nowhere'} />)

    cy.get('.product-details').should('be.visible');
    cy.get('.product-details').find('.platform').should('be.visible');
    cy.get('.product-details').should('contain', '$100.93');
    cy.get('.platform').should('contain', 'nowhere');
    cy.get('.product-details').find('.rating').should('be.visible');
    cy.get('.rating').should('contain', 'Rating : 4.96');
    cy.get('.rating').should('contain', '(234)');
  })

  it('renders with all no ratings', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ProductPriceCard name={'test-product'} price={'100.93'} rating={undefined} num_reviews={'234'} product_link={'app.here'} platform={'nowhere'} />)

    cy.get('.product-details').should('be.visible');
    cy.get('.product-details').find('.platform').should('be.visible');
    cy.get('.product-details').should('contain', '$100.93');
    cy.get('.platform').should('contain', 'nowhere');
    cy.get('.product-details').should('not.contain', 'Rating :');
    cy.get('.product-details').should('not.contain', '(234)');
  })
})