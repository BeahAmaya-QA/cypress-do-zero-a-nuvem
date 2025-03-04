Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Beatriz')
    cy.get('#lastName').type('França')
    cy.get('#email').type('bia@exemplo.com')
    cy.get('#open-text-area').type('Teste')

    cy.get('button[type="submit"]').click()
                
    
})
