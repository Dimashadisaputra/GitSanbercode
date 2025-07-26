//mengambil file loginpages.js
import Login from '../../../support/loginpage'
import data from '../../../fixtures/logindata.json'

describe ('scenario project', ()=> {
    it('Login-Project T-Log-001', ()=> {
        Login.visit()
        Login.Username(data.validusername)
        Login.Password(data.validpassword)
        Login.LoginIntercept()
        Login.ButtonLogin()
        Login.LoginWaitSukses()
    })

    it('Forget password T-Log-002', ()=>{
        Login.visit()
        Login.ButtonForget()
        Login.UserReset(data.validusername)
        Login.ResetIntercept()
        Login.buttonreset()
        Login.ResetWait()
    })
    
    it('Dashboard T-Log-001', ()=>{
        Login.visit()
        Login.Username(data.validusername)
        Login.Password(data.validpassword)
        Login.LoginIntercept()
        Login.ButtonLogin()
        Login.LoginWaitSukses()
        Login.directoryIntercept()
        Login.ClickDirectory()
        Login.DirectWait()
        // Login.employename(data.NameDirectory)
        Login.locationdirec()
        
    })
})