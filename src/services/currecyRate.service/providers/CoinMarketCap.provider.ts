import { request as fetch } from "undici";
import {
  ICurrencyRateService,
  IHTTPCurrencyRateService,
  ICurrencyRateServiceFactory,
  IChainedCurrencyRateService,
  rate
} from "../../../interfaces/currencyRateService";

class CoinMarketCapCurrencyRateFactory implements ICurrencyRateServiceFactory {
  createCurrencyRateService(
    api_key: string
  ): ICurrencyRateService & IChainedCurrencyRateService {
    return new CoinMarketCapCurrencyRateService(api_key);
  }
}

class CoinMarketCapCurrencyRateService
  implements
    ICurrencyRateService,
    IHTTPCurrencyRateService,
    IChainedCurrencyRateService
{
  readonly url = process.env.COINMARKETCAP_API_URL;
  private api_key;
  next: (IChainedCurrencyRateService & ICurrencyRateService) | null;

  constructor(api_key: string) {
    this.api_key = api_key;
    this.next = null;
  }

  async getRate(): Promise<rate> {
    try {
      const { statusCode, body } = await fetch(this.url, {
        headers: {
          "X-CMC_PRO_API_KEY": this.api_key
        }
      });
      if (statusCode == 200) {
        const { data } = await body.json();
        const rate = data[0].quote.UAH.price;
        return Math.round(rate * 100) / 100;
      } else throw new Error();
    } catch (error) {
      if (this.next == null) return null;
      return await this.next.getRate();
    }
  }

  getProviderInfo(): string {
    return "CoinMarketCap";
  }
}

export { CoinMarketCapCurrencyRateFactory };
