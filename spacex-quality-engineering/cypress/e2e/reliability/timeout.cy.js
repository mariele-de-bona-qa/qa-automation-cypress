describe('SpaceX Reliability - Timeout Handling', () => {

  it('deve validar tempo máximo de resposta da API de lançamentos', () => {

    cy.request('/launches')
      .then((response) => {

        expect(response.duration)
          .to.be.lessThan(5000)

      })

  })

  it('deve validar tempo máximo de resposta da API de foguetes', () => {

    cy.request('/rockets')
      .then((response) => {

        expect(response.duration)
          .to.be.lessThan(5000)

      })

  })

  it('deve validar estabilidade de múltiplas chamadas consecutivas', () => {

    const durations = []

    Cypress._.times(5, () => {

      cy.request('/launches/latest')
        .then((response) => {

          durations.push(response.duration)

        })

    })

    cy.then(() => {

      durations.forEach((duration) => {

        expect(duration)
          .to.be.lessThan(5000)

      })

    })

  })

  it('deve validar disponibilidade contínua da API', () => {

    Cypress._.times(3, () => {

      cy.request({
        url: '/launches',
        failOnStatusCode: false
      }).then((response) => {

        expect(response.status).to.eq(200)

      })

    })

  })

})
