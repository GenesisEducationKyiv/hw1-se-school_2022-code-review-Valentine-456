import { request as fetch } from "undici";

type rate = number | null

class CurrencyRateSerivice {
    private static readonly url: string = "https://pro-api.coinmarketcap.com/v2/tools/price-conversion?amount=1&symbol=BTC&convert=UAH";

    static async getRate(): Promise<rate> {
        const { statusCode, body } = await fetch(this.url, {
            headers: {
                "X-CMC_PRO_API_KEY": process.env.CURRENCY_API_KEY
            }
        })
        if(statusCode == 200) {
            const {data} = await body.json()
            const rate = data[0].quote.UAH.price;
            return Math.round(rate*100)/100
        }
        else {
            return null;
        }
    }
}

export default CurrencyRateSerivice