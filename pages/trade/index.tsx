import { Box, Grid, Typography } from "@mui/material";
import React, { FC, ReactNode } from "react";
import { getExchangeInfo } from "../../api/binanceAPI";
import { useQuery } from "react-query";
import { url } from "inspector";
import TradeCoinCard from "../../components/Trade/TradeCoinCard";
import { coinList } from "../../constant/CoinData";
type TradeProps = {
  children?: ReactNode;
};

/**
 * 함수 설명
 *
 * @param {any} example 함수가 받는 파라 미터 설명
 * @returns 리턴 설명
 */
const Trade: FC<TradeProps> = () => {
  const exchangeInfoData = useQuery(
    "exchangeInfo",
    () => getExchangeInfo("ehtusdt"),
    {
      onSuccess(data) {
        console.log(data);
      },
    }
  );
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Grid
        container
        rowSpacing={1}
        columns={{ xs: 1, sm: 2 }}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {coinList.map((item, index) => {
          return (
            <Grid item xs={1} key={index}>
              <TradeCoinCard
                symbol={item.symbol}
                code={item.code}
                name={item.name}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Trade;
