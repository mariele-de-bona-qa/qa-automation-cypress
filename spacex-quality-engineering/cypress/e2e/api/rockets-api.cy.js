const rocketsUrl = 'https://api.spacexdata.com/v4/rockets'

describe('SpaceX API - Rockets', () => {

  it('deve retornar lista de foguetes com estrutura válida', () => {
    cy.request(rocketsUrl)
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.be.an('array')
        expect(response.body.length).to.be.greaterThan(0)

        response.body.forEach((rocket) => {
          expect(rocket).to.have.property('id')
          expect(rocket).to.have.property('name')
          expect(rocket).to.have.property('type')
          expect(rocket).to.have.property('active')
          expect(rocket).to.have.property('cost_per_launch')
          expect(rocket).to.have.property('success_rate_pct')
        })
      })
  })

  it('deve validar tipos de dados dos foguetes', () => {
    cy.request(rocketsUrl)
      .then((response) => {
        response.body.forEach((rocket) => {
          expect(rocket.name).to.be.a('string')
          expect(rocket.type).to.be.a('string')
          expect(rocket.active).to.be.a('boolean')
          expect(rocket.cost_per_launch).to.be.a('number')
          expect(rocket.success_rate_pct).to.be.a('number')
        })
      })
  })

  it('deve validar que existe pelo menos um foguete ativo', () => {
    cy.request(rocketsUrl)
      .then((response) => {
        const activeRockets = response.body.filter(
          (rocket) => rocket.active === true
        )

        expect(activeRockets.length).to.be.greaterThan(0)
      })
  })

})
