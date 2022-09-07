import { matchers } from "jest-json-schema";
import { subscribeValidationSchema } from "../../../../src/routes/subscribe/index.schemas";

expect.extend(matchers);

describe("Testing index.schema.ts", () => {
  test("Will the schema pass all of the valid emails + other optionsin body", async () => {
    const emails = [
      "email@example.com",
      "firstname.lastname@example.subdomain.com",
      "firstname+lastname@example.com",
      "email@123.123.123.123",
      "email@example-one.com",
      "_______@example.museum",
      "firstname-lastname@example.com",
      "Joe Smith <email@example.com>"
    ];

    const requestsGood = emails.map((email) => {
      return { email, hello: "world" };
    });

    requestsGood.forEach((requestBody) =>
      expect(requestBody).toMatchSchema(subscribeValidationSchema.schema.body)
    );
  });

  test("Will the schema pass any of the invalid emails", async () => {
    const emails = [
      "@example.com",
      "fgdnzdbfdtsyrnatrsjnahr_Brvrbv",
      "email@[123.123.123.123]",
      "“email”@example.com"
    ];

    const requestsBad = emails.map((email) => {
      return { email };
    });

    requestsBad.forEach((requestBody) =>
      expect(requestBody).not.toMatchSchema(
        subscribeValidationSchema.schema.body
      )
    );
  });

  test("Will the schema pass an empty body", async () => {
    const requestsEmpty = {};

    expect(requestsEmpty).not.toMatchSchema(
      subscribeValidationSchema.schema.body
    );
  });
});
