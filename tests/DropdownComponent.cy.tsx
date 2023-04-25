import React from 'react'
import {DropdownComponent} from '../components/DropdownComponent'

describe('DropdownComponent Loads properly', () => {

  it('renders', () => {

    const testItems = [
      { key: "test1", name: "Test 1" }
    ];

    cy.mount(<DropdownComponent ddType={'test-type'} ddItems={testItems}/>);
    cy.get('#test-type-dropdown-selector').should('exist');

  })

})

describe('DropdownComponent has the required options', () => {

  it('renders', () => {

    const testItems = [
      { key: "test1", name: "Test 1" },
      { key: "test2", name: "Test 2" },
    ];

    
    cy.mount(<DropdownComponent ddType={'test-type'} ddItems={testItems}/>);
    cy.get('#test-type-dropdown-selector').should('exist');
    cy.get('.drop-down-selection').click();
    cy.get('.nextui-dropdown-item-content').contains('Test 1');
    cy.get('.nextui-dropdown-item-content').contains('Test 2');

  })
})