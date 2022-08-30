import { request as fetch } from "undici";

type rate = number | null;

class CurrencyRateSerivice {
  private static readonly url: string = process.env.CURRENCY_API_URL;
  private static readonly api_key: string = process.env.CURRENCY_API_KEY;

  static async getRate(): Promise<rate> {
    const { statusCode, body } = await fetch(this.url, {
      headers: {
        "X-CMC_PRO_API_KEY": this.api_key,
      },
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

export default CurrencyRateSerivice;
