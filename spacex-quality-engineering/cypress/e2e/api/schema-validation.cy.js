const rocketsUrl = 'https://api.spacexdata.com/v4/rockets'

describe('SpaceX API - Schema Validation', () => {

  it('deve validar o schema básico de um lançamento', () => {
    cy.request('/launches/latest')
      .then((response) => {
        expect(response.status).to.eq(200)

        const launch = response.body

        expect(launch).to.include.keys(
          'id',
          'name',
          'date_utc',
          'date_unix',
          'date_local',
          'date_precision',
          'flight_number',
          'rocket',
          'success',
          'upcoming',
          'links',
          'failures',
          'crew',
          'ships',
          'capsules',
          'payloads',
          'launchpad',
          'cores'
        )
      })
  })

  it('deve validar tipos de dados do lançamento mais recente', () => {
    cy.request('/launches/latest')
      .then((response) => {
        const launch = response.body

        expect(launch.id).to.be.a('string')
        expect(launch.name).to.be.a('string')
        expect(launch.date_utc).to.be.a('string')
        expect(launch.date_unix).to.be.a('number')
        expect(launch.flight_number).to.be.a('number')
        expect(launch.upcoming).to.be.a('boolean')
        expect(launch.links).to.be.an('object')
        expect(launch.failures).to.be.an('array')
        expect(launch.crew).to.be.an('array')
        expect(launch.ships).to.be.an('array')
        expect(launch.capsules).to.be.an('array')
        expect(launch.payloads).to.be.an('array')
        expect(launch.cores).to.be.an('array')
      })
  })

  it('deve validar schema de links do lançamento', () => {
    cy.request('/launches/latest')
      .then((response) => {
        const links = response.body.links

        expect(links).to.have.property('patch')
        expect(links).to.have.property('reddit')
        expect(links).to.have.property('flickr')
        expect(links).to.have.property('presskit')
        expect(links).to.have.property('webcast')
        expect(links).to.have.property('youtube_id')
        expect(links).to.have.property('article')
        expect(links).to.have.property('wikipedia')

        expect(links.patch).to.be.an('object')
        expect(links.reddit).to.be.an('object')
        expect(links.flickr).to.be.an('object')
      })
  })

  it('deve validar schema de foguetes', () => {
    cy.request(rocketsUrl)
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.be.an('array')
        expect(response.body.length).to.be.greaterThan(0)

        response.body.forEach((rocket) => {
          expect(rocket).to.include.keys(
            'height',
            'diameter',
            'mass',
            'first_stage',
            'second_stage',
            'engines',
            'landing_legs',
            'payload_weights',
            'flickr_images',
            'name',
            'type',
            'active',
            'stages',
            'boosters',
            'cost_per_launch',
            'success_rate_pct',
            'first_flight',
            'country',
            'company',
            'wikipedia',
            'description',
            'id'
          )
        })
      })
  })

  it('deve validar campos obrigatórios de foguetes', () => {
    cy.request(rocketsUrl)
      .then((response) => {
        response.body.forEach((rocket) => {
          expect(rocket.id).to.be.a('string')
          expect(rocket.name).to.be.a('string')
          expect(rocket.type).to.be.a('string')
          expect(rocket.active).to.be.a('boolean')
          expect(rocket.stages).to.be.a('number')
          expect(rocket.cost_per_launch).to.be.a('number')
          expect(rocket.success_rate_pct).to.be.a('number')
          expect(rocket.flickr_images).to.be.an('array')
        })
      })
  })

})
