import { request as fetch } from "undici";
import {
  ICurrencyRateService,
  IHTTPCurrencyRateService,
  ICurrencyRateServiceFactory,
  rate
} from "../interfaces/currencyRateService";

class CoinMarketCapCurrencyRateFactory implements ICurrencyRateServiceFactory {
  createCurrencyRateService(api_key: string): ICurrencyRateService {
    return new CoinMarketCapCurrencyRateService(api_key);
  }
}

class CoinMarketCapCurrencyRateService
  implements ICurrencyRateService, IHTTPCurrencyRateService
{
  readonly url = process.env.COINMARKETCAP_API_URL;
  private api_key;

  constructor(api_key: string) {
    this.api_key = api_key;
  }

  async getRate(): Promise<rate> {
    const { statusCode, body } = await fetch(this.url, {
      headers: {
        "X-CMC_PRO_API_KEY": this.api_key
      }
    });
    if (statusCode == 200) {
      const { data } = await body.json();
      const rate = data[0].quote.UAH.price;
      return Math.round(rate * 100) / 100;
    } else {
      return null;
    }
  }
}

class APILayerCurrencyRateFactory implements ICurrencyRateServiceFactory {
  createCurrencyRateService(api_key: string): ICurrencyRateService {
    return new APILayerCurrencyRateService(api_key);
  }
}

class APILayerCurrencyRateService
  implements ICurrencyRateService, IHTTPCurrencyRateService
{
  constructor(api_key: string) {
    this.api_key = api_key;
  }
  readonly url: string = process.env.APILAYER_API_URL;
  private api_key;
  async getRate(): Promise<rate> {
    const { statusCode, body } = await fetch(this.url, {
      headers: {
        apikey: this.api_key
      }
    });
    if (statusCode == 200) {
      const { result } = await body.json();
      return Math.round(result * 100) / 100;
    } else {
      return null;
    }
  }
}

class CachingCurrencyRateService implements ICurrencyRateService {
  private currencyRateService: ICurrencyRateService;
  private readonly CACHE_DURATION_MS = process.env.CACHE_TIME_MS;
  private latestChacheTime = 0;
  private cachedRate: rate = null;

  constructor(currencyRateService: ICurrencyRateService) {
    this.currencyRateService = currencyRateService;
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

export {
  CoinMarketCapCurrencyRateFactory,
  APILayerCurrencyRateFactory,
  CachingCurrencyRateService
};
