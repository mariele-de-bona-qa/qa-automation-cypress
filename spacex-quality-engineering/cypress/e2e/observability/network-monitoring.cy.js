const rocketsUrl = 'https://api.spacexdata.com/v4/rockets'

describe('SpaceX Observability - Network Monitoring', () => {

  it('deve monitorar tempo de resposta da API de lançamentos', () => {
    cy.request('/launches')
      .then((response) => {
        const duration = response.duration

        cy.log(`Tempo de resposta Launches: ${duration}ms`)

        expect(response.status).to.eq(200)
        expect(duration).to.be.lessThan(3000)
      })
  })

  it('deve validar disponibilidade da API de foguetes', () => {
    cy.request(rocketsUrl)
      .then((response) => {
        cy.log(`Status API Rockets: ${response.status}`)

        expect(response.status).to.eq(200)
        expect(response.body).to.be.an('array')
        expect(response.body.length).to.be.greaterThan(0)
      })
  })

  it('deve validar payload do último lançamento', () => {
    cy.request('/launches/latest')
      .then((response) => {
        const body = response.body

        expect(response.status).to.eq(200)
        expect(body).to.have.property('name')
        expect(body).to.have.property('date_utc')
        expect(body).to.have.property('rocket')
        expect(body).to.have.property('links')

        cy.log(`Último lançamento: ${body.name}`)
      })
  })

  it('deve validar estabilidade das chamadas da API', () => {
    const responseTimes = []

    Cypress._.times(5, () => {
      cy.request('/launches')
        .then((response) => {
          responseTimes.push(response.duration)
        })
    })

    cy.then(() => {
      const average =
        responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length

      cy.log(`Tempo médio Launches: ${average}ms`)

      responseTimes.forEach((time) => {
        expect(time).to.be.lessThan(3000)
      })
    })
  })

  it('deve validar headers da API', () => {
    cy.request('/launches/latest')
      .then((response) => {
        expect(response.headers).to.have.property('content-type')
        expect(response.headers['content-type']).to.include('application/json')

        cy.log(`Content-Type: ${response.headers['content-type']}`)
      })
  })

  it('deve validar disponibilidade contínua da API', () => {
    Cypress._.times(3, () => {
      cy.request({
        method: 'GET',
        url: '/launches',
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.be.oneOf([200, 304])
      })
    })
  })

  it('deve validar comportamento sob múltiplas requisições', () => {
    Cypress._.times(5, () => {
      cy.request(rocketsUrl)
        .then((response) => {
          expect(response.status).to.eq(200)
        })
    })
  })

})
