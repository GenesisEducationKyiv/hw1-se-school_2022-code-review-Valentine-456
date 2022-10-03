export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      API_KEY_1: string;
      API_KEY_2: string;
      MAILJET_API_KEY: string;
      MAILJET_SECRET_API: string;
      EMAIL_SERVICE: "sendgrid" | "mailjet";
      EMAIL_FROM: string;
      ENV: "test" | "dev" | "prod";
    }
  }
}
