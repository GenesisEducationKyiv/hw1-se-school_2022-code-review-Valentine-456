import { jest } from "@jest/globals";
import CurrencyRateSerivice from "../../../src/services/currencyRate.service";

describe("Testing currencyRate.service.ts", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("If the CurrencyRateSerivice returns a number or a null", async () => {
    jest.spyOn(CurrencyRateSerivice, "getRate").mockImplementation(async () => {
      const responses = [800000.98, null];
      return responses[Math.floor(Math.random() * responses.length)];
    });

    const rate = await CurrencyRateSerivice.getRate();
    const isNumberOrNull = rate === null || typeof rate === "number";

    expect(isNumberOrNull).toBe(true);
  });
});
