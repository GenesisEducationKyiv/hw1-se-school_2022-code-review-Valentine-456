import { ICurrencyRateService } from "../interfaces/currencyRateService";
import {
  CoinMarketCapCurrencyRateFactory,
  APILayerCurrencyRateFactory,
  CachingCurrencyRateService
} from "./currencyRate.service";

let mainCurrencyRateService: ICurrencyRateService;

const coinMarketCapCurrencyRateService =
  new CoinMarketCapCurrencyRateFactory().createCurrencyRateService(
    process.env.COINMARKETCAP_API_KEY
  );
const apiLayerCurrencyRateService =
  new APILayerCurrencyRateFactory().createCurrencyRateService(
    process.env.APILAYER_API_KEY
  );

switch (process.env.CRYPTO_CURRENCY_PROVIDER) {
  case "coinmarketcap":
    mainCurrencyRateService = new CachingCurrencyRateService(
      coinMarketCapCurrencyRateService
    );
    break;
  case "apilayer":
    mainCurrencyRateService = new CachingCurrencyRateService(
      apiLayerCurrencyRateService
    );
    break;
}

export { mainCurrencyRateService };
