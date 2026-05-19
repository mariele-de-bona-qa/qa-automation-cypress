const rocketsUrl = 'https://api.spacexdata.com/v4/rockets'

describe('SpaceX Media - Images Validation', () => {

  it('deve validar que imagens dos lançamentos retornam status 200', () => {
    cy.request('/launches')
      .then((response) => {
        const launches = response.body.filter(
          (launch) =>
            launch.links &&
            launch.links.patch &&
            launch.links.patch.large
        )

        expect(launches.length).to.be.greaterThan(0)

        launches.slice(0, 5).forEach((launch) => {
          cy.request({
            url: launch.links.patch.large,
            failOnStatusCode: false
          }).then((imageResponse) => {
            expect(imageResponse.status).to.eq(200)
          })
        })
      })
  })

  it('deve validar que foguetes possuem imagens cadastradas', () => {
    cy.request(rocketsUrl)
      .then((response) => {
        expect(response.status).to.eq(200)

        response.body.forEach((rocket) => {
          expect(rocket.flickr_images).to.be.an('array')
          expect(rocket.flickr_images.length).to.be.greaterThan(0)
        })
      })
  })

  it('deve validar integridade das imagens dos foguetes', () => {
    cy.request(rocketsUrl)
      .then((response) => {
        response.body.slice(0, 3).forEach((rocket) => {
          const image = rocket.flickr_images[0]

          cy.request({
            url: image,
            failOnStatusCode: false
          }).then((imgResponse) => {
            expect(imgResponse.status).to.eq(200)
          })
        })
      })
  })

})