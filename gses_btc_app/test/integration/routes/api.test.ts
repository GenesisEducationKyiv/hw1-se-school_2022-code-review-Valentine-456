"use strict";
import Fastify from "fastify";
import fp from "fastify-plugin";
import { writeFile } from "fs/promises";
import { resolve } from "path";
import { app as App } from "../../../src/app";
import { HttpResponseMessage } from "../../../src/utils/httpResponseMessage.enum";

const app = Fastify();
const requestBody = {
  email: "email.it@gmail.com"
};
const clearFileSystemDB = async () => {
  await writeFile(
    resolve(__dirname, "../../../src/database/data/subscribtions.json"),
    "[]\n",
    { encoding: "utf-8" }
  );
};

beforeAll(async () => {
  void app.register(fp(App));
  await app.ready();
});

afterAll(async () => {
  app.close();
  await clearFileSystemDB();
});

describe("API testing of GSES2 BTC UAH application", () => {
  test("endpoint: api/rate ", async () => {
    const res = await app.inject({
      url: "/api/rate"
    });

    expect(res.statusCode).toBe(200);
    expect(res.json()).toBeGreaterThan(0);
  });

  test("endpoint: api/subscribe ", async () => {
    const res = await app.inject({
      url: "/api/subscribe",
      method: "POST",
      payload: requestBody
    });

    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({
      status: "success",
      message: HttpResponseMessage.EMAIL_ADDED
    });
  });

  test("endpoint: api/subscribe - with already registered email", async () => {
    const res = await app.inject({
      url: "/api/subscribe",
      method: "POST",
      payload: requestBody
    });

    expect(res.statusCode).toBe(409);
    expect(res.json()).toEqual({
      error: "Conflict",
      message: "This email is already registered!",
      statusCode: 409
    });
  });

  test("endpoint: api/sendEmails ", async () => {
    const res = await app.inject({
      url: "/api/sendEmails",
      method: "POST"
    });

    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({
      status: "success",
      message: HttpResponseMessage.EMAILS_SENT
    });
  });
});
