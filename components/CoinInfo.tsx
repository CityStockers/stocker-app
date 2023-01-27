import { Box, Typography } from "@mui/material";
import React, { FC, ReactNode } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

type CoinInfoProps = {
  children?: ReactNode;
  symbol: any;
};

/**
 * 함수 설명
 */
const CoinInfo = ({ symbol }: CoinInfoProps) => {
  //   const result = getCoinIcon(code);
  const router = useRouter();
  return (
    <Box
      sx={{
        paddingX: 2,
        paddingY: 2,
        backgroundColor: "#FAF9FF",
        width: "100%",
        borderRadius: 4,
        border: "1px solid #DFDFDF",
        marginY: 1,
      }}
    >
      <Typography variant="h6" fontWeight={600}>
        {symbol} Stock
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>Owned Stocks</Typography>
        <Typography>3</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>Average price per stock</Typography>
        <Typography>$230</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>Stock Profit</Typography>
        <Typography color="blue">-$80 (3.6%)</Typography>
      </Box>
    </Box>
  );
};

export default CoinInfo;
