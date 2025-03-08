Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
        firstName:'Beatriz',
        lastName:'Amaya',
        email:'bia123@email.com',
        beatriz:'Text'

}) => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)

    cy.get('button[type="submit"]').click()
})