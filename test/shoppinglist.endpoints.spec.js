const app = require("../src/app");
const helpers = require('../test/test-helpers')

const { testUsers } = helpers.makeItemsFixtures()
const testUser = testUsers[0]

describe("GET / root", () => {
  it("should return root endpoint", () => {
    return supertest(app).get("/").expect(200);
  });
});

