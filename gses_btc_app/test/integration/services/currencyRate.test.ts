import CurrencyRateService from "../../../src/services/currencyRate.service";

describe("Testing currencyRate.service.ts", () => {
  test("If the real CurrencyRateService returns a number", async () => {
    const rate = await CurrencyRateService.getRate();

    expect(typeof rate).toBe("number");
  });
});
