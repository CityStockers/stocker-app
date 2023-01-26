import axios from "axios";
const baseUrl = "https://cryptoicons.org/api/color";

export const getCoinIcon = async (code: string) => {
  const { data } = await axios
    .get(`${baseUrl}/${code}/600`)
    .then((response) => {
      console.log("coinImage retrieved successful");
      return response;
    })
    .catch((err) => {
      console.log("coinImage retrieved failed");
      return err;
    });

  return data;
};
