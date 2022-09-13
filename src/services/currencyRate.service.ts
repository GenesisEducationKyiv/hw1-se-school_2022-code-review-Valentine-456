import { request as fetch } from "undici";
import {
  ICurrencyRateService,
  IHTTPCurrencyRateService,
  ICurrencyRateServiceFactory,
  IChainedCurrencyRateService,
  rate
} from "../interfaces/currencyRateService";

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

  async execNext(): Promise<rate> {
    if (this.next == null) return null;
    return await this.next.getRate();
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
      return await this.execNext();
    }
  }
}

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
      return await this.execNext();
    }
  }

  async execNext(): Promise<rate> {
    if (this.next == null) return null;
    return await this.next.getRate();
  }
}

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
      return await this.execNext();
    }
  }

  async execNext(): Promise<rate> {
    if (this.next == null) return null;
    return await this.next.getRate();
  }
}

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
  async execNext(): Promise<rate> {
    if (this.next == null) return null;
    return await this.next.getRate();
  }
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
      return await this.execNext();
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
  CoinAPICurrencyRateFactory,
  CoinbaseCurrencyRateFactory,
  CachingCurrencyRateService
};
