describe('SpaceX API - Launch Details', () => {

  let latestLaunchId

  before(() => {
    cy.request('/launches/latest')
      .then((response) => {
        expect(response.status).to.eq(200)
        latestLaunchId = response.body.id
      })
  })

  it('deve buscar detalhes de um lançamento pelo ID', () => {
    cy.request(`/launches/${latestLaunchId}`)
      .then((response) => {
        expect(response.status).to.eq(200)

        expect(response.body).to.have.property('id', latestLaunchId)
        expect(response.body).to.have.property('name')
        expect(response.body).to.have.property('date_utc')
        expect(response.body).to.have.property('rocket')
        expect(response.body).to.have.property('links')
      })
  })

  it('deve validar contrato mínimo dos detalhes do lançamento', () => {
    cy.request(`/launches/${latestLaunchId}`)
      .then((response) => {
        const launch = response.body

        expect(launch.id).to.be.a('string')
        expect(launch.name).to.be.a('string')
        expect(launch.date_utc).to.match(/^\d{4}-\d{2}-\d{2}T/)
        expect(launch.rocket).to.be.a('string')
        expect(launch.links).to.be.an('object')
      })
  })

  it('deve validar payload de mídia do lançamento', () => {
    cy.request(`/launches/${latestLaunchId}`)
      .then((response) => {
        const links = response.body.links

        expect(links).to.have.property('patch')
        expect(links).to.have.property('webcast')
        expect(links).to.have.property('article')
        expect(links).to.have.property('wikipedia')
      })
  })

  it('deve validar comportamento para ID inexistente', () => {
    cy.request({
      url: '/launches/invalid-launch-id',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.be.oneOf([400, 404, 500])
    })
  })

  it('deve validar tempo de resposta dos detalhes do lançamento', () => {
    cy.request(`/launches/${latestLaunchId}`)
      .then((response) => {
        expect(response.duration).to.be.lessThan(3000)
      })
  })

})
