import React from 'react'
import ProductCard from '../components/ProductCard'

describe('ProductCard loads properly with all the details', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ProductCard imageSrc={undefined} brand={"ABCxyz"} name={"ABCxyz test product"} productId={undefined} categoryId={undefined} />)

    cy.get('.product-card').should('be.visible');
    cy.get('.product-card').find('img').should('be.visible');

    cy.get('.product-details').should('contain', 'ABCxyz');
    cy.get('.product-details').should('contain', 'ABCxyz test product');
  })
})