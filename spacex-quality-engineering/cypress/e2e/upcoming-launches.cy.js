describe('SpaceX API - Upcoming Launches', () => {

  it('deve retornar lançamentos futuros com estrutura válida', () => {
    cy.request('/launches/upcoming')
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.be.an('array')

        response.body.forEach((launch) => {
          expect(launch).to.have.property('id')
          expect(launch).to.have.property('name')
          expect(launch).to.have.property('date_utc')
          expect(launch).to.have.property('upcoming')
          expect(launch).to.have.property('rocket')
          expect(launch).to.have.property('links')
        })
      })
  })

  it('deve validar que todos os lançamentos retornados são marcados como futuros', () => {
    cy.request('/launches/upcoming')
      .then((response) => {
        response.body.forEach((launch) => {
          expect(launch.upcoming).to.eq(true)
        })
      })
  })

  it('deve validar formato de data dos lançamentos futuros', () => {
    cy.request('/launches/upcoming')
      .then((response) => {
        response.body.forEach((launch) => {
          expect(launch.date_utc).to.match(/^\d{4}-\d{2}-\d{2}T/)
        })
      })
  })

  it('deve validar que os lançamentos possuem identificação de foguete', () => {
    cy.request('/launches/upcoming')
      .then((response) => {
        response.body.forEach((launch) => {
          expect(launch.rocket).to.be.a('string')
          expect(launch.rocket).to.not.be.empty
        })
      })
  })

  it('deve validar tempo de resposta da listagem de lançamentos futuros', () => {
    cy.request('/launches/upcoming')
      .then((response) => {
        expect(response.duration).to.be.lessThan(3000)
      })
  })

})