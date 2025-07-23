
describe ('API Cypress - TUGAS 18', ()=> {
    it('List user', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users',
      headers : {
        'x-api-key' : 'reqres-free-v1',
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.duration).to.be.lessThan(1000)
      expect(response.body.data[0]).to.have.property('email', 'george.bluth@reqres.in')
    });
  });

    it('tambah user', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      headers : {
        'x-api-key' : 'reqres-free-v1',
      },
      body : {
        name : 'Dimas',
        email : 'dimassaputra612@gmail.com'
      }
    }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.duration).to.be.lessThan(1000)
      expect(response.body).to.have.property('name', 'Dimas')
    });
  });

    it('edit user', () => {
    cy.request({
      method: 'PUT',
      url: 'https://reqres.in/api/users/4',
      headers : {
        'x-api-key' : 'reqres-free-v1',
      },
      body : {
        name : 'Dimas',
        email : 'dimassaputr@gmail.com'
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.duration).to.be.lessThan(1000)
      expect(response.body).to.have.property('name', 'Dimas')
    });
  });

    it('hapus user', () => {
    cy.request({
      method: 'Delete',
      url: 'https://reqres.in/api/users/4',
      headers : {
        'x-api-key' : 'reqres-free-v1',
      }
    }).then((response) => {
      expect(response.status).to.eq(204)
    });
  });

})