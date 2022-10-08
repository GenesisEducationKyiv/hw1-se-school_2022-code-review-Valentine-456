import { CoinbaseCrawler, SelfProvider } from "./rateProviders";

const coinbaseCrawler = new CoinbaseCrawler();
const selfProvider = new SelfProvider();

beforeAll(async () => {
  await coinbaseCrawler.launch();
  await selfProvider.launch();
});

afterAll(async () => {
  await coinbaseCrawler.close();
  await selfProvider.close();
});

test("Difference between Coinbase's and this app's rates should be less than 5%", async () => {
  const selfRate = await selfProvider.getRate();

  const coinbaseRate = await coinbaseCrawler.getRate();

  expect(Math.abs(coinbaseRate - selfRate) / coinbaseRate).toBeLessThan(0.05);
}, 30000);
