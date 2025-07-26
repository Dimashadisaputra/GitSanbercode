class LoginProject{
    visit(){
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    }
    //Login dan lupa password
    Username(email){
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type(email, { delay: 100 })
    }
    Password(pass){
        cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type(pass, { delay: 100 })
    }
    UserReset(username){
        cy.get('.oxd-input').type(username, { delay: 100 })
    }

    // DashBoard
    ClickDirectory(){
        cy.get(':nth-child(9) > .oxd-main-menu-item > .oxd-text').click()
        cy.url().should('include','https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory')
    }
    employename(Name){
        cy.get('.oxd-autocomplete-text-input > input').type(Name)
    }
    locationdirec(){
        // location directory
        cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click()
        cy.get('.oxd-select-dropdown').should('be.visible')
        cy.contains('.oxd-select-dropdown > :nth-child(5) > span','Texas R&D').click()
        cy.get('.oxd-button--secondary').click()
    }


    //intercept
    LoginIntercept(){
        cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/subunit').as('submit')
        cy.intercept('POST','https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('validate')
        cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('messages')
    }
    ResetIntercept(){
        cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/auth/sendPasswordReset').as('sendreset')
        cy.intercept('POST','https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestResetPassword').as('reqreset')
        cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('messages')
    }
    directoryIntercept(){
        cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory').as('VDirec')
        cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPhoto/empNumber/7').as('photo')
    }

    //respon intercept
    LoginWaitSukses(){
        cy.wait('@submit').its('response.statusCode').should('eq',200)
        cy.wait('@validate').its('response.statusCode').should('eq',302)
        cy.wait('@messages').its('response.statusCode').should('eq',304)
    }
    ResetWait(){
        cy.wait('@sendreset').its('response.statusCode').should('eq',200)
        cy.wait('@reqreset').its('response.statusCode').should('eq',302)
        cy.wait('@messages').its('response.statusCode').should('eq',304)
    }
    DirectWait(){
        cy.wait('@VDirec').its('response.statusCode').should('eq',200)
        cy.wait('@photo').its('response.statusCode').should('eq',304)
    }

    //Button
    ButtonLogin(){
        cy.get('.oxd-button').click()
        cy.url().should('include','https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')
    }
    ButtonForget(){
        cy.get('.orangehrm-login-forgot > .oxd-text').click()
        cy.url().should('include','https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode')
    }
    buttonreset(){
        cy.get('.oxd-button--secondary').click()
        cy.get('.orangehrm-card-container').should('contain','Reset Password link sent successfully')
    }


}

export default new LoginProject()