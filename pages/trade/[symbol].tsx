import { Box, Typography, withStyles } from "@mui/material";
import React, { FC, ReactNode, use, useEffect, useState } from "react";
import { useRouter } from "next/router";

type TradeSymbolProps = {
  children?: ReactNode;
};

/**
 * 함수 설명
 *
 * @param {any} example 함수가 받는 파라 미터 설명
 * @returns 리턴 설명
 */
const TradeSymbol: FC<TradeSymbolProps> = () => {
  const router = useRouter();
  const symbol = router.query.symbol;
  const [price, setPrice] = useState(0);
  console.log(price);

  useEffect(() => {
    let ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@trade`);
    ws.onmessage = (event) => {
      console.log(event.data);
      let stockObject = JSON.parse(event.data);
      setPrice(stockObject.p);
    };

    return () => {
      ws.close();
    };
  }, [symbol]);

  return (
    <Box>
      <Typography>코인 가격: {price}</Typography>
    </Box>
  );
};

export default TradeSymbol;
