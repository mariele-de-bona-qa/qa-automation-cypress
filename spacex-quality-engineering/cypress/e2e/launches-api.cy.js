describe('SpaceX API - Launches', () => {

  it('deve retornar todos os lançamentos com estrutura válida', () => {
    cy.request('/launches')
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.be.an('array')
        expect(response.body.length).to.be.greaterThan(0)

        response.body.forEach((launch) => {
          expect(launch).to.have.property('id')
          expect(launch).to.have.property('name')
          expect(launch).to.have.property('date_utc')
          expect(launch).to.have.property('rocket')
          expect(launch).to.have.property('success')
          expect(launch).to.have.property('upcoming')
          expect(launch).to.have.property('links')
        })
      })
  })

  it('deve validar tipos de dados dos lançamentos', () => {
    cy.request('/launches')
      .then((response) => {
        response.body.forEach((launch) => {
          expect(launch.id).to.be.a('string')
          expect(launch.name).to.be.a('string')
          expect(launch.date_utc).to.be.a('string')
          expect(launch.rocket).to.be.a('string')
          expect(launch.upcoming).to.be.a('boolean')
          expect(launch.links).to.be.an('object')
        })
      })
  })

  it('deve validar formato ISO das datas dos lançamentos', () => {
    cy.request('/launches')
      .then((response) => {
        response.body.forEach((launch) => {
          expect(launch.date_utc).to.match(/^\d{4}-\d{2}-\d{2}T/)
        })
      })
  })

  it('deve validar que existe pelo menos um lançamento realizado com sucesso', () => {
    cy.request('/launches')
      .then((response) => {
        const successfulLaunches = response.body.filter(
          (launch) => launch.success === true
        )

        expect(successfulLaunches.length).to.be.greaterThan(0)
      })
  })

  it('deve validar que existe pelo menos um lançamento futuro', () => {
    cy.request('/launches')
      .then((response) => {
        const upcomingLaunches = response.body.filter(
          (launch) => launch.upcoming === true
        )

        expect(upcomingLaunches.length).to.be.greaterThan(0)
      })
  })

  it('deve validar integridade mínima dos links de mídia', () => {
    cy.request('/launches')
      .then((response) => {
        const launchesWithLinks = response.body.filter(
          (launch) => launch.links
        )

        expect(launchesWithLinks.length).to.be.greaterThan(0)

        launchesWithLinks.slice(0, 5).forEach((launch) => {
          expect(launch.links).to.have.property('patch')
          expect(launch.links).to.have.property('webcast')
          expect(launch.links).to.have.property('article')
        })
      })
  })

  it('deve validar tempo de resposta da API de lançamentos', () => {
    cy.request('/launches')
      .then((response) => {
        expect(response.duration).to.be.lessThan(3000)
      })
  })

})