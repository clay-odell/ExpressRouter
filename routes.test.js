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

describe("GET /items/:invalidname", function () {
    test("Attempts to get a an invalid item name, returns a 404", async function () {
        const resp = await request(app).get("/items/notpickles");
        expect(resp.statusCode).toBe(404);
        expect(resp.body).toEqual({error: {message: "Item not found", status: 404}});

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

describe("PATCH /items/:name", function() {
    test("It should update an item's name and/or price", async function() {
        const resp = await request(app).patch("/items/pickles").send({ name: "newPickles", price: "$2.45"});
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({updated: {name: "newPickles", price: "$2.45"}});
    });
});
