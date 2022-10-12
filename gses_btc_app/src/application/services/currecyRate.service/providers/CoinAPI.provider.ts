import { request as fetch } from "undici";
import {
  ICurrencyRateService,
  IHTTPCurrencyRateService,
  ICurrencyRateServiceFactory,
  IChainedCurrencyRateService,
  rate
} from "../../../../domain/services/currencyRateService";

class CoinAPICurrencyRateFactory implements ICurrencyRateServiceFactory {
  createCurrencyRateService(
    api_key: string
  ): ICurrencyRateService & IChainedCurrencyRateService {
    return new CoinAPICurrencyRateService(api_key);
  }
}

class CoinAPICurrencyRateService
  implements
    ICurrencyRateService,
    IHTTPCurrencyRateService,
    IChainedCurrencyRateService
{
  constructor(api_key: string) {
    this.api_key = api_key;
    this.next = null;
  }
  readonly url: string = process.env.COINAPI_API_URL;
  private api_key;
  next: (IChainedCurrencyRateService & ICurrencyRateService) | null;

  async getRate(): Promise<rate> {
    try {
      const { statusCode, body } = await fetch(this.url, {
        headers: {
          "X-CoinAPI-Key": this.api_key
        }
      });
      if (statusCode == 200) {
        const { rate } = await body.json();
        return Math.round(rate * 100) / 100;
      } else throw new Error();
    } catch (error) {
      if (this.next == null) return null;
      return await this.next.getRate();
    }
  }

  getProviderInfo(): string {
    return "CoinAPI";
  }
}

export { CoinAPICurrencyRateFactory };
