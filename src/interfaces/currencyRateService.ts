type rate = number | null;

interface ICurrencyRateServiceFactory {
  createCurrencyRateService(
    api_key: string
  ): ICurrencyRateService & IChainedCurrencyRateService;
}

interface ICurrencyRateService {
  getRate(): Promise<rate>;
  getProviderInfo(): string;
}

interface IHTTPCurrencyRateService {
  readonly url: string;
}

interface IChainedCurrencyRateService {
  next: (IChainedCurrencyRateService & ICurrencyRateService) | null;
  execNext(): Promise<rate>;
}

export {
  ICurrencyRateServiceFactory,
  ICurrencyRateService,
  IHTTPCurrencyRateService,
  IChainedCurrencyRateService,
  rate
};
