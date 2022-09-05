import CurrencyRateSerivice from "../../../src/services/currencyRate.service";

describe("Testing currencyRate.service.ts", () => {
  test("If the real CurrencyRateSerivice returns a number", async () => {
    const rate = await CurrencyRateSerivice.getRate();

    expect(typeof rate).toBe("number");
  });
});
