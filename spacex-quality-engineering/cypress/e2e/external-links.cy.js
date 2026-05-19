describe('SpaceX Media - External Links', () => {

  it('deve validar links da Wikipedia', () => {

    cy.request('/launches')
      .then((response) => {

        const launchesWithWikipedia = response.body.filter(
          (launch) =>
            launch.links &&
            launch.links.wikipedia
        )

        launchesWithWikipedia
          .slice(0, 5)
          .forEach((launch) => {

            cy.request({
              url: launch.links.wikipedia,
              failOnStatusCode: false
            }).then((wikiResponse) => {

              expect(wikiResponse.status)
                .to.be.oneOf([200, 301, 302])

            })

          })

      })

  })

  it('deve validar links de artigos externos', () => {

    cy.request('/launches')
      .then((response) => {

        const launchesWithArticles = response.body.filter(
          (launch) =>
            launch.links &&
            launch.links.article
        )

        launchesWithArticles
          .slice(0, 5)
          .forEach((launch) => {

            expect(launch.links.article)
              .to.include('http')

          })

      })

  })

  it('deve validar integridade de links externos', () => {

    cy.request('/launches/latest')
      .then((response) => {

        const article = response.body.links.article

        if (article) {

          cy.request({
            url: article,
            failOnStatusCode: false
          }).then((articleResponse) => {

            expect(articleResponse.status)
              .to.be.oneOf([200, 301, 302])

          })

        }

      })

  })

})