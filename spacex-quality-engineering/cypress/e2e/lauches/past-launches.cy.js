describe('SpaceX API - Past Launches', () => {

  it('deve retornar lançamentos passados com estrutura válida', () => {
    cy.request('/launches/past')
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.be.an('array')
        expect(response.body.length).to.be.greaterThan(0)

        response.body.forEach((launch) => {
          expect(launch).to.have.property('id')
          expect(launch).to.have.property('name')
          expect(launch).to.have.property('date_utc')
          expect(launch).to.have.property('success')
          expect(launch).to.have.property('rocket')
          expect(launch).to.have.property('links')
        })
      })
  })

  it('deve validar que lançamentos passados possuem upcoming como false', () => {
    cy.request('/launches/past')
      .then((response) => {
        response.body.forEach((launch) => {
          expect(launch.upcoming).to.eq(false)
        })
      })
  })

  it('deve validar que lançamentos passados possuem datas anteriores ou iguais à data atual', () => {
    cy.request('/launches/past')
      .then((response) => {
        const now = new Date()

        response.body.forEach((launch) => {
          const launchDate = new Date(launch.date_utc)

          expect(launchDate.getTime()).to.be.lessThan(now.getTime())
        })
      })
  })

  it('deve validar que pelo menos um lançamento possui status de sucesso', () => {
    cy.request('/launches/past')
      .then((response) => {
        const successfulLaunches = response.body.filter(
          (launch) => launch.success === true
        )

        expect(successfulLaunches.length).to.be.greaterThan(0)
      })
  })

  it('deve validar integridade mínima dos links de mídia', () => {
    cy.request('/launches/past')
      .then((response) => {
        const launchesWithLinks = response.body.filter(
          (launch) => launch.links && launch.links.patch
        )

        expect(launchesWithLinks.length).to.be.greaterThan(0)

        launchesWithLinks.slice(0, 5).forEach((launch) => {
          expect(launch.links).to.have.property('patch')
          expect(launch.links.patch).to.have.property('small')
          expect(launch.links.patch).to.have.property('large')
        })
      })
  })

})
