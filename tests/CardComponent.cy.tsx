import React from 'react'
import { CardComponent } from '../components/CardComponent'

describe('CardComponent loads properly', () => {
  it('renders', () => {

    cy.mount(<CardComponent index={0} id={0} name={'tile1'} />);
    
    cy.get('.card-cat-component').should('be.visible');
    cy.get('.card-cat-component').find('img').should('be.visible');
    cy.get('.card-cat-component').find('h1').should('be.visible');
    cy.get('.card-cat-component').find('h1').should('contain', 'tile1');

  })
})