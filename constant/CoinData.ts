// export const coinList = [
//   { symbol: "btcusdt", code: "btc", name: "Bitcoin" },
//   { symbol: "ethusdt", code: "eth", name: "Etherium" },
//   { symbol: "xrpusdt", code: "xrp", name: "Ripple" },
//   { symbol: "solusdt", code: "sol", name: "Solana" },
//   { symbol: "bnbusdt", code: "bnb", name: "Binancecoin" },
//   { symbol: "ltcusdt", code: "ltc", name: "Litecoin" },
//   { symbol: "aptusdt", code: "apt", name: "Aptos" },
//   { symbol: "shibusdt", code: "shib", name: "Shiba Inu" },
//   { symbol: "enjusdt", code: "enj", name: "Enjin" },
//   { symbol: "maticusdt", code: "matic", name: "Polygon" },
// ];

export const coinList = [
  { symbol: "BTCUSDT", code: "btc", name: "Bitcoin" },
  { symbol: "ETHUSDT", code: "eth", name: "Etherium" },
  { symbol: "XRPUSDT", code: "xrp", name: "Ripple" },
  { symbol: "SOLUSDT", code: "sol", name: "Solana" },
  { symbol: "BNBUSDT", code: "bnb", name: "Binancecoin" },
  { symbol: "LTCUSDT", code: "ltc", name: "Litecoin" },
  { symbol: "ADAUSDT", code: "ada", name: "Ada" },
  { symbol: "DOTUSDT", code: "dot", name: "Polkadot" },
  { symbol: "ENJUSDT", code: "enj", name: "Enjin" },
  { symbol: "MATICUSDT", code: "matic", name: "Polygon" },
];

export const getCoinName = (symbol: string) => {
  const result = coinList.filter((item) => item.symbol === symbol);
  return result[0].name;
};
