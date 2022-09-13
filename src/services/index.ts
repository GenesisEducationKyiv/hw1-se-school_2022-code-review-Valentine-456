import { ICurrencyRateService } from "../interfaces/currencyRateService";
import {
  CoinMarketCapCurrencyRateFactory,
  APILayerCurrencyRateFactory,
  CoinAPICurrencyRateFactory,
  CoinbaseCurrencyRateFactory,
  CachingCurrencyRateService
} from "./currencyRate.service";
import { CurrencyRateProvidersLogger } from "../utils/loggers";

let mainCurrencyRateService: ICurrencyRateService;

const provider1 =
  new CoinMarketCapCurrencyRateFactory().createCurrencyRateService(
    process.env.COINMARKETCAP_API_KEY
  );
const provider2 = new APILayerCurrencyRateFactory().createCurrencyRateService(
  process.env.APILAYER_API_KEY
);
const provider3 = new CoinAPICurrencyRateFactory().createCurrencyRateService(
  process.env.COINAPI_API_KEY
);
const provider4 = new CoinbaseCurrencyRateFactory().createCurrencyRateService(
  process.env.COINBASE_API_KEY
);
provider1.next = new CurrencyRateProvidersLogger(provider3);
provider2.next = new CurrencyRateProvidersLogger(provider3);
provider3.next = new CurrencyRateProvidersLogger(provider4);

switch (process.env.CRYPTO_CURRENCY_PROVIDER) {
  case "coinmarketcap":
    mainCurrencyRateService = new CachingCurrencyRateService(
      new CurrencyRateProvidersLogger(provider1)
    );
    break;
  case "apilayer":
    mainCurrencyRateService = new CachingCurrencyRateService(
      new CurrencyRateProvidersLogger(provider2)
    );
    break;
}
mainCurrencyRateService = new CurrencyRateProvidersLogger(
  mainCurrencyRateService
);

export { mainCurrencyRateService };
