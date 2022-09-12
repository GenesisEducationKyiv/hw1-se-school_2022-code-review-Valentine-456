type rate = number | null;

interface ICurrencyRateServiceFactory {
  createCurrencyRateService(api_key: string): ICurrencyRateService;
}

interface ICurrencyRateService {
  getRate(): Promise<rate>;
}

interface IHTTPCurrencyRateService {
  readonly url: string;
}

export {
  ICurrencyRateServiceFactory,
  ICurrencyRateService,
  IHTTPCurrencyRateService,
  rate
};
