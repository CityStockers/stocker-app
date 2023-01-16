import axios from "axios";
const baseUrl = "https://api.binance.com";

export const getExchangeInfo = async (symbol: string) => {
  const { data } = await axios.get(`${baseUrl}/api/v3/exchangeInfo`, {
    params: { symbol: symbol },
  });

  return data;
};
