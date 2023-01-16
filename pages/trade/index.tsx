import { Box, Typography } from "@mui/material";
import React, { FC, ReactNode } from "react";
import { getExchangeInfo } from "../../api/binanceAPI";
import { useQuery } from "react-query";
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
    () => getExchangeInfo("BNBUSDT"),
    {
      onSuccess(data) {
        console.log(data);
      },
    }
  );
  return (
    <Box>
      <Typography>트레이드 코인들 보여주기</Typography>
    </Box>
  );
};

export default Trade;
