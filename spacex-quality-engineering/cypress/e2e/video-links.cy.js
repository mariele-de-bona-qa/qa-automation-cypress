describe('SpaceX Media - Video Links', () => {

  it('deve validar formato dos IDs do YouTube', () => {

    cy.request('/launches')
      .then((response) => {

        const launchesWithVideos = response.body.filter(
          (launch) =>
            launch.links &&
            launch.links.youtube_id
        )

        expect(launchesWithVideos.length)
          .to.be.greaterThan(0)

        launchesWithVideos.slice(0, 10).forEach((launch) => {

          expect(launch.links.youtube_id)
            .to.match(/^[a-zA-Z0-9_-]{11}$/)

        })

      })

  })

  it('deve validar URLs de webcast', () => {

    cy.request('/launches')
      .then((response) => {

        const launchesWithWebcast = response.body.filter(
          (launch) =>
            launch.links &&
            launch.links.webcast
        )

        launchesWithWebcast.slice(0, 5).forEach((launch) => {

          expect(launch.links.webcast)
            .to.include('http')

        })

      })

  })

  it('deve validar que vídeos retornam status válido', () => {

    cy.request('/launches/latest')
      .then((response) => {

        const webcast = response.body.links.webcast

        if (webcast) {

          cy.request({
            url: webcast,
            failOnStatusCode: false
          }).then((videoResponse) => {

            expect(videoResponse.status)
              .to.be.oneOf([200, 301, 302])

          })

        }

      })

  })

})