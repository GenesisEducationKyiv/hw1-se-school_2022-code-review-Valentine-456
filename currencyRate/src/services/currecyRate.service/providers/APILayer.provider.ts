import { request as fetch } from "undici";
import {
  ICurrencyRateService,
  IHTTPCurrencyRateService,
  ICurrencyRateServiceFactory,
  IChainedCurrencyRateService,
  rate
} from "../../../interfaces/currencyRateService";

class APILayerCurrencyRateFactory implements ICurrencyRateServiceFactory {
  createCurrencyRateService(
    api_key: string
  ): ICurrencyRateService & IChainedCurrencyRateService {
    return new APILayerCurrencyRateService(api_key);
  }
}

class APILayerCurrencyRateService
  implements
    ICurrencyRateService,
    IHTTPCurrencyRateService,
    IChainedCurrencyRateService
{
  constructor(api_key: string) {
    this.api_key = api_key;
    this.next = null;
  }
  readonly url: string = process.env.APILAYER_API_URL;
  private api_key;
  next: (IChainedCurrencyRateService & ICurrencyRateService) | null;

  async getRate(): Promise<rate> {
    try {
      const { statusCode, body } = await fetch(this.url, {
        headers: {
          apikey: this.api_key
        }
      });
      if (statusCode == 200) {
        const { result } = await body.json();
        return Math.round(result * 100) / 100;
      } else throw new Error();
    } catch (error) {
      if (this.next == null) return null;
      return await this.next.getRate();
    }
  }

  getProviderInfo(): string {
    return "APILayer";
  }
}

export { APILayerCurrencyRateFactory };
