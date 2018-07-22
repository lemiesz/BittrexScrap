const puppeteer = require('puppeteer');
const MARKET_NAME = "BTC-OMG";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://bittrex.com/Market/Index?MarketName='+MARKET_NAME);
  var _document = {};
  await page.screenshot({path: 'example.png'});
  page.on('console', (...args) => console.log('PAGE LOG:', ...args));
  await page.addScriptTag("https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js");
  await getValue(page);
  await setInterval(() => {
   getValue(page);
  }, 5000);

  // await browser.close();
})();

getValue = async (page) => {
  const result = await page.evaluate(() => {
    var baseMarket = $(".base-market");
    if(baseMarket) {
        console.log("Found last value");
        var spanLastValue = baseMarket.first().find("span");
        if(spanLastValue[0]) {
          console.log(spanLastValue.text());
          return Promise.resolve(spanLastValue.text());
        }
        return Promise.resolve("Error");
      }
    });
    return result;
}
