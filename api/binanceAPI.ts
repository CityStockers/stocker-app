import axios from "axios";
const baseUrl = "http://localhost:3002";

export const getPrice = async (symbol: string) => {
  const { data } = await axios.get(`${baseUrl}/quote/crypto/${symbol}`, {
    params: { symbol: symbol },
  });

  return data;
};

export const getPriceList = async (symbol: string, interval: string) => {
  const { data } = await axios.get(
    `${baseUrl}/pricelist/crypto/${symbol}/${interval}/120`
  );

  return data;
};
