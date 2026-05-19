describe('SpaceX Reliability - API Failure', () => {

  it('deve validar comportamento para endpoint inexistente', () => {

    cy.request({
      url: '/invalid-endpoint',
      failOnStatusCode: false
    }).then((response) => {

      expect(response.status)
        .to.be.oneOf([404, 400])

    })

  })

  it('deve validar tratamento de erro para ID inválido', () => {

    cy.request({
      url: '/launches/invalid-id',
      failOnStatusCode: false
    }).then((response) => {

      expect(response.status)
        .to.be.oneOf([400, 404, 500])

    })

  })

  it('deve validar comportamento da API sem autenticação', () => {

    cy.request({
      method: 'GET',
      url: '/launches',
      failOnStatusCode: false
    }).then((response) => {

      expect(response.status).to.eq(200)

    })

  })

  it('deve validar fallback para recursos inexistentes', () => {

    cy.request({
      url: '/rockets/123-invalid',
      failOnStatusCode: false
    }).then((response) => {

      expect(response.status)
        .to.be.oneOf([400, 404, 500])

    })

  })

})