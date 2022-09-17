export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      API_KEY_1: string;
      API_KEY_2: string;
      EMAIL_FROM: string;
      ENV: "test" | "dev" | "prod";
      COINMARKETCAP_API_URL: string;
      COINMARKETCAP_API_KEY: string;
      APILAYER_API_URL: string;
      APILAYER_API_KEY: string;
      COINAPI_API_URL: string;
      COINAPI_API_KEY: string;
      COINBASE_API_URL: string;
      COINBASE_API_KEY: string;
      CRYPTO_CURRENCY_PROVIDER: "coinmarketcap" | "apilayer";
      CACHE_TIME_MS: number;
    }
  }
}
