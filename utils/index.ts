import moment from "moment";
import { Quote } from "../components/Auto/type";
import { Wallet } from "../stocker-core/sdk/Types/Account";

export const parsePriceList = (data: Quote[]): number[] => {
  const parsedPriceArray: number[] = [];
  data.forEach((item) => {
    parsedPriceArray.push(item.closePrice);
  });

  return parsedPriceArray;
};

export const parseTimeList = (data: Quote[]): string[] => {
  const parsedTimeArray: string[] = [];
  data.forEach((item) => {
    parsedTimeArray.push(convertTime(item.timestamp));
  });

  return parsedTimeArray;
};

export function convertTime(timestamp: number) {
  const date = new Date(timestamp);
  return moment(date).format("DD/MM/YYYY hh:mm:ss");
}

export const parseCoinList = (wallets: Wallet[]): Wallet[] => {
  const resultList = wallets.filter((wallet) => wallet.amount > 0);
  return resultList;
};

export const compare = (a: any, b: any) => {
  if (a.timestamp > b.timestamp) {
    return -1;
  }
  if (a.timestamp < b.timestamp) {
    return 1;
  }
  return 0;
};
