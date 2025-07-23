class login1{

    // Untuk Login
    visit(){
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    }
    isiemail(email){
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type(email, { delay: 100 })
    }
    isipw(password){
        cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type(password, { delay: 100 })
    }
    submit(){
        cy.get('.oxd-button').click()
    }
    // Reset Password
    forget(){
        cy.get('.orangehrm-login-forgot > .oxd-text').click()
    }
    userreset(username){
        cy.get('.oxd-input').type(username, { delay: 100 })
    }
    klikreset(){
        cy.get('.oxd-button--secondary').click()
    }

    // Untuk assert
    loginsukses(){
        cy.url().should('include','https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')
    }
    logingagal(){
        cy.get('.oxd-alert-content').should('contain','Invalid credentials')
    }
    resetpassberhasil(){
        cy.get('.orangehrm-card-container').should('contain','Reset Password link sent successfully')
    }
    
}

export default new login1()