describe('Accessibility - SpaceX Public Pages', () => {

  beforeEach(() => {
    cy.visit('https://www.spacex.com/launches/')
    cy.injectAxe()
  })

  it('deve analisar acessibilidade e registrar violações críticas', () => {
    cy.checkA11y(
      null,
      {
        includedImpacts: ['critical', 'serious']
      },
      (violations) => {
        cy.task('log', `${violations.length} violações encontradas`)

        violations.forEach((violation) => {
          cy.task('log', `
            Impacto: ${violation.impact}
            Regra: ${violation.id}
            Descrição: ${violation.description}
            Elementos afetados: ${violation.nodes.length}
          `)
        })
      },
      true
    )
  })

})
