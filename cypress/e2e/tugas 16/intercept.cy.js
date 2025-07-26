/// <reference types="cypress" />

describe('scenario login', () => {
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  })
  it('T-Log-001', () => {
   // isi Username
    cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Admin', { delay: 100 }).should('have.value', 'Admin')
    //isi password
    cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type('admin123', { delay: 100 }).should('have.value', 'admin123')
    //intercept
    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/subunit').as('submit')
    cy.intercept('POST','https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('validate')
    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('messages')
    //klik login
    cy.get('.oxd-button').click()
    //respon intersept
    cy.wait('@submit').its('response.statusCode').should('eq',200)
    cy.wait('@validate').its('response.statusCode').should('eq',302)
    cy.wait('@messages').its('response.statusCode').should('eq',304)
    //dihalaman dashboard
    cy.url().should('include','https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')
  })

  it('T-Log-002', () => {
   // isi Username Salah
    cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Dimas', { delay: 100 }).should('have.value', 'Dimas')
    //isi password
    cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type('admin123', { delay: 100 }).should('have.value', 'admin123')
    //intercept
    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/auth/login').as('login')
    cy.intercept('POST','https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('validate')
    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('messages')
    //klik login
    cy.get('.oxd-button').click()
    //respon intersept
    cy.wait('@login').its('response.statusCode').should('eq',200)
    cy.wait('@validate').its('response.statusCode').should('eq',302)
    cy.wait('@messages').its('response.statusCode').should('eq',304)
    //massage error
    cy.get('.oxd-alert-content').should('contain','Invalid credentials')
  })


  it('T-Log-003', () => {
  //klik forget password
   cy.get('.orangehrm-login-forgot > .oxd-text').click()
   //halaman url reset password
   cy.url().should('include','https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode')
   //isi username dihalaman reset password
   cy.get('.oxd-input').type('Admin', { delay: 100 }).should('have.value', 'Admin')
   //intercept
    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/auth/sendPasswordReset').as('sendreset')
    cy.intercept('POST','https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestResetPassword').as('reqreset')
    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('messages')
   //klik halaman reset password
   cy.get('.oxd-button--secondary').click()
   //respon intersept
    cy.wait('@sendreset').its('response.statusCode').should('eq',200)
    cy.wait('@reqreset').its('response.statusCode').should('eq',302)
    cy.wait('@messages').its('response.statusCode').should('eq',304)
   //muncul alert reset password berhasil
    cy.get('.orangehrm-card-container').should('contain','Reset Password link sent successfully')
  })
})

