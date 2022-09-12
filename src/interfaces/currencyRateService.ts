type rate = number | null;

interface ICurrencyRateServiceFactory {
  createCurrencyRateService(api_key: string): ICurrencyRateService;
}

interface ICurrencyRateService {
  readonly url: string;
  getRate(): Promise<rate>;
}

export { ICurrencyRateServiceFactory, ICurrencyRateService, rate };
