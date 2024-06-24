process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("./app");

let items = require("./fakeDb");

let pickles = { name: "pickles", price: "$2.45" };

beforeEach(function () {
  items.push(pickles);
});

afterEach(function () {
  items.length = 0;
});

describe("GET /items", function () {
  test("Gets a list of items", async function () {
    const resp = await request(app).get("/items");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ items: [pickles] });
  });
});

describe("GET /items/:name", function () {
    test("Gets a specific item from list", async function () {
        const resp = await request(app).get("/items/pickles");
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({"name": "pickles", "price": "$2.45" });
    });
});

describe("POST /items", function () {
  test("Posts an item to list of items", async function () {
    const resp = await request(app)
      .post("/items")
      .send({ name: "apple", price: "$0.80" });
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({ added: { name: "apple", price: "$0.80" } });
  });
});
