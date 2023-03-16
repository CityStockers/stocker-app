export const algorithmList = [
  `const trader = new Trader();

let yesterdayPrice = { timestamp: 0, openPrice: 0, closePrice: 0, lowPrice: 0, highPrice: 0 };
let targetBuyPrice: number;

trader.onTimeChange((market, timestamp) => {
  if (yesterdayPrice.timestamp !== 0) {
    const todayPrice = market.getQuote(timestamp);
    targetBuyPrice =
      todayPrice.openPrice +
      (yesterdayPrice.highPrice - yesterdayPrice.lowPrice) * 0.25;
    if (targetBuyPrice <= todayPrice.highPrice && market.getCoin() === 0) {
      market.buy(
        Math.trunc(market.getWallet() / targetBuyPrice),
        targetBuyPrice
      );
    }
  }

  if (market.getCoin() > 0) {
    market.sell(market.getCoin());
  }

  yesterdayPrice = market.getQuote(timestamp);
}, "1d");

export default trader;`,
  `const trader = new Trader();

// Define the parameters
var period = 5; // The number of bars to calculate the moving average
var threshold = 0.05; // The percentage above or below the moving average to trigger a trade
var lotSize = 10; // The number of units to trade

// Initialize the variables
var ma = 0; // The moving average value
var sum = 0; // The sum of the prices for the moving average calculation
var position = 0; // The current position: 1 for long, -1 for short, 0 for none
var data: number[] = []
var i = 0;
// Loop through the price data
trader.onTimeChange((market, timestamp) => {
  // Get the current price
  var price = market.getQuote(timestamp);
   data.push(price.closePrice)
  // Update the sum and the moving average
  if (i >= period) {
    // Remove the oldest price from the sum
    sum -= data[i - period];
  }

  // Add the current price to the sum
  sum += price.closePrice;

  // Calculate the moving average
  ma = sum / Math.min(i + 1, period);

  // Check if there is a trading signal
  if (price.closePrice > ma * (1 + threshold)) {
    // Buy signal: go long or close short position
    if (position != 1) {
      market.buy(lotSize)
      position = 1;
    }
    
    } else if (price.closePrice < ma * (1 - threshold)) {
      // Sell signal: go short or close long position
      
      if (position != -1) {
        market.sell(lotSize)
        position = -1;
      }
      
      } else {
        // No signal: do nothing
  }
i += 1;
}, "1d");

export default trader;`,
  `const trader = new Trader();

trader.onTimeChange((market, timestamp) => {

}, "1d");

export default trader;`,
];
