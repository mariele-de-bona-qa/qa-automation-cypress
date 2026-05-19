const rocketsUrl = 'https://api.spacexdata.com/v4/rockets'

describe('SpaceX Reliability - Retry Strategy', () => {

it('deve validar retry em falha temporária de status code', () => {
  cy.request({
    url: '/launches/latest',
    failOnStatusCode: true,
    retryOnStatusCodeFailure: true
  }).then((response) => {
    expect(response.status).to.eq(200)
  })
})

  it('deve validar retry em falha de rede para lançamentos', () => {
    cy.request({
      url: '/launches',
      retryOnNetworkFailure: true
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })

  it('deve validar resiliência em múltiplas chamadas de foguetes', () => {
    Cypress._.times(3, () => {
      cy.request({
        url: rocketsUrl,
        retryOnNetworkFailure: true
      }).then((response) => {
        expect(response.status).to.eq(200)
      })
    })
  })

  it('deve validar consistência da API após múltiplas chamadas', () => {
    const statuses = []

    Cypress._.times(5, () => {
      cy.request({
        url: '/launches/latest',
        retryOnNetworkFailure: true,
        failOnStatusCode: false
      }).then((response) => {
        statuses.push(response.status)
      })
    })

    cy.then(() => {
      statuses.forEach((status) => {
        expect(status).to.eq(200)
      })
    })
  })

})
