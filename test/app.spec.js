
const app = require('../src/app')

describe('App', () => {
  it('GET / responds with 200 containing "Server is live"', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Server is live')
  })
})