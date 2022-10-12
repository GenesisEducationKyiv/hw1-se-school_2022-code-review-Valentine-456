import { chromium } from "@playwright/test";
import Fastify from "fastify";
import fp from "fastify-plugin";
import { app as App } from "../../src/app";

class CoinbaseCrawler {
  private page: any;
  private window: any;

  async launch(): Promise<void> {
    const window = await chromium.launch({ headless: false });
    const page = await window.newPage();
    await page.goto("https://www.coinbase.com/explore");
    this.page = page;
    this.window = window;
  }

  async getRate(): Promise<number> {
    await this.page.locator("#asset-page-currency-selector").click();
    await this.page.locator("input#asset-page-currency-selector").fill("uah");
    await this.page.locator("text=Ukrainian Hryvnia").click();
    let rateString = await this.page
      .locator(
        ".Listing__TableBodyWrapper-sc-1ktidpo-0.jtPuLx > tr:first-of-type > td:nth-of-type(2) span"
      )
      .innerText();
    rateString = rateString.trim().slice(3).replace(",", "");
    const rate = parseFloat(rateString);
    return rate;
  }

  async close(): Promise<void> {
    await this.page.close();
    await this.window.close();
  }
}

class SelfProvider {
  private app: any;

  async launch(): Promise<void> {
    const app = Fastify();
    void app.register(fp(App));
    await app.ready();
    this.app = app;
  }

  async getRate(): Promise<number> {
    const res = await this.app.inject({
      url: "/api/rate"
    });
    const rate = res.json();
    return rate;
  }

  async close(): Promise<void> {
    this.app.close();
  }
}

export { CoinbaseCrawler, SelfProvider };
