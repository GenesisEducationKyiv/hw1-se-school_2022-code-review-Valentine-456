import {
  ICurrencyRateService,
  rate
} from "../../interfaces/currencyRateService";

class CachingCurrencyRateService implements ICurrencyRateService {
  private currencyRateService: ICurrencyRateService;
  private readonly CACHE_DURATION_MS = process.env.CACHE_TIME_MS;
  private latestChacheTime = 0;
  private cachedRate: rate = null;

  constructor(currencyRateService: ICurrencyRateService) {
    this.currencyRateService = currencyRateService;
  }
  getProviderInfo(): string {
    return "Cache";
  }

  async getRate(): Promise<rate> {
    const delay = Date.now() - this.latestChacheTime;
    if (delay > this.CACHE_DURATION_MS || this.cachedRate == null) {
      this.cachedRate = await this.currencyRateService.getRate();
      this.latestChacheTime = Date.now();
    }
    return this.cachedRate;
  }
}

export { CachingCurrencyRateService };
