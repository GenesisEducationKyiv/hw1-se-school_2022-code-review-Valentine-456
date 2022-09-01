export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      CURRENCY_API_URL: string;
      CURRENCY_API_KEY: string;
      API_KEY_1: string;
      API_KEY_2: string;
      EMAIL_FROM: string;
      ENV: "test" | "dev" | "prod";
    }
  }
}
