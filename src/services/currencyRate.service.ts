import { request as fetch } from "undici";
import {
  ICurrencyRateService,
  ICurrencyRateServiceFactory,
  rate
} from "../interfaces/currencyRateService";

class CoinMarketCapCurrencyRateFactory implements ICurrencyRateServiceFactory {
  createCurrencyRateService(api_key: string): ICurrencyRateService {
    return new CoinMarketCapCurrencyRateService(api_key);
  }
}

class CoinMarketCapCurrencyRateService implements ICurrencyRateService {
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

class APILayerCurrencyRateService implements ICurrencyRateService {
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

export { CoinMarketCapCurrencyRateFactory, APILayerCurrencyRateFactory };
