//mengambil file loginpages.js
import login1 from '../javascript/loginpages'

describe ('scenario login', ()=> {
    it('T-Log-001', ()=> {
        login1.visit()
        login1.isiemail('Admin')
        login1.isipw('admin123')
        login1.submit()
        login1.loginsukses()
    })

    it('T-Log-002', ()=> {
        login1.visit()
        login1.isiemail('Dimas')
        login1.isipw('admin123')
        login1.submit()
        login1.logingagal()
    })
    
    it('T-Log-003', ()=> {
        login1.visit()
        login1.forget()
        login1.userreset('Admin')
        login1.klikreset()
        login1.resetpassberhasil()
    })
})