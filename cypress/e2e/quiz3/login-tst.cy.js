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
    //klik login
    cy.get('.oxd-button').click()
    //dihalaman dashboard
    cy.url().should('include','https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')
  })

  it('T-Log-002', () => {
   // isi Username Salah
    cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Dimas', { delay: 100 }).should('have.value', 'Dimas')
    //isi password
    cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type('admin123', { delay: 100 }).should('have.value', 'admin123')
    //klik login
    cy.get('.oxd-button').click()
    //massage error
    cy.get('.oxd-alert-content').should('contain','Invalid credentials')
  })

  it('T-Log-003', () => {
  // tidak mengisi Form

  //klik login
   cy.get('.oxd-button').click()
  //massage required
   cy.get(':nth-child(2) > .oxd-input-group > .oxd-text').should('contain','Required')
  })

  it('T-Log-004', () => {
  //klik forget password
   cy.get('.orangehrm-login-forgot > .oxd-text').click()
   //halaman url reset password
   cy.url().should('include','https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode')
   //isi username dihalaman reset password
   cy.get('.oxd-input').type('Admin', { delay: 100 }).should('have.value', 'Admin')
   //klik halaman reset password
   cy.get('.oxd-button--secondary').click()
   //muncul alert reset password berhasil
   cy.get('.orangehrm-card-container').should('contain','Reset Password link sent successfully')
  })

  it('T-Log-005', () => {
  //klik forget password
   cy.get('.orangehrm-login-forgot > .oxd-text').click()
   //halaman url reset password
   cy.url().should('include','https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode')
   //tanpa isi username

   //klik halaman reset password
   cy.get('.oxd-button--secondary').click()
   //muncul alert reset password berhasil
   cy.get('.orangehrm-card-container').should('contain','Required')
  })

})

