import { request as fetch } from "undici";
import {
  ICurrencyRateService,
  IHTTPCurrencyRateService,
  ICurrencyRateServiceFactory,
  IChainedCurrencyRateService,
  rate
} from "../../../interfaces/currencyRateService";

class CoinbaseCurrencyRateFactory implements ICurrencyRateServiceFactory {
  createCurrencyRateService(
    api_key: string
  ): ICurrencyRateService & IChainedCurrencyRateService {
    return new CoinbaseCurrencyRateService(api_key);
  }
}

class CoinbaseCurrencyRateService
  implements
    ICurrencyRateService,
    IHTTPCurrencyRateService,
    IChainedCurrencyRateService
{
  constructor(api_key: string) {
    this.api_key = api_key;
    this.next = null;
  }
  next: (IChainedCurrencyRateService & ICurrencyRateService) | null;

  readonly url: string = process.env.COINBASE_API_URL;
  private api_key: string;
  async getRate(): Promise<rate> {
    try {
      const { statusCode, body } = await fetch(this.url);
      if (statusCode == 200) {
        const { data } = await body.json();
        const rate = parseFloat(data.amount);
        return Math.round(rate * 100) / 100;
      } else throw new Error();
    } catch (error) {
      if (this.next == null) return null;
      return await this.next.getRate();
    }
  }

  getProviderInfo(): string {
    return "Coinbase";
  }
}

export { CoinbaseCurrencyRateFactory };
