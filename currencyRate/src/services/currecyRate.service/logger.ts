import {
  IChainedCurrencyRateService,
  ICurrencyRateService,
  rate
} from "../../interfaces/currencyRateService";

class CurrencyRateProvidersLogger {
  private currencyRateProvider: ICurrencyRateService;

  constructor(currencyRateProvider: ICurrencyRateService) {
    this.currencyRateProvider = currencyRateProvider;
    this.next = null;
  }
  next: (IChainedCurrencyRateService & ICurrencyRateService) | null;
  getProviderInfo(): string {
    return "Logger";
  }

  async getRate(): Promise<rate> {
    const rate = await this.currencyRateProvider.getRate();
    this.log(rate);
    return rate;
  }

  private log(rate: rate) {
    const provider = this.currencyRateProvider.getProviderInfo();
    console.log(`
${provider} - Rate: ${rate}
        `);
  }
}

export { CurrencyRateProvidersLogger };
