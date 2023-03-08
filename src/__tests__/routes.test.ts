import app from "../server";
import supertest from "supertest";

describe("Get /", () => {
  it("should send back some data", async () => {
    const res = await supertest(app).get("/");

    expect(res.body.message).toBe("API is on!");
  });
});
