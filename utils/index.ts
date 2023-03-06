import moment from "moment";
import { Quote } from "../pages/auto/type";

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
