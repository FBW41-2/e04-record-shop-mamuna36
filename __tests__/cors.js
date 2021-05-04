const app = require("../app");
//supertest is like postman and it makes requests
const request = require("supertest");
const mongoose = require("mongoose");

describe.each(["/orders", "/users", "/records"])("Cors in GET %s", (path) => {
  test(`Cors in GET` + path, async () => {
    const res = await request(app).get(path);
    console.log(res.headers);
    expect(res.header).toEqual(
      expect.objectContaining({
        "access-control-allow-origin": expect.anything(),
        "access-control-allow-headers": expect.anything(),
        "access-control-allow-methods": expect.stringContaining("GET"),
      })
    );
  });
  test(`Content-type json in GET` + path, async () => {
    const res = await request(app).get(path);
    console.log(res.headers);
    expect(res.header).toEqual(
      expect.objectContaining({
        "content-type": expect.stringContaining("application/json"),
      })
    );
  });
});
beforeAll(async (done) => {
  server = app.listen(3000, () => {
    global.agent = request.agent(server);
    done();
  });
});
// afterAll runs after all tests are run. it is important to close the port to let the next test run
afterAll(async () => {
  await server.close();
  await mongoose.disconnect();
});
