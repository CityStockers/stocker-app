import { Box, Typography } from "@mui/material";
import React, { FC, ReactNode } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Wallet } from "../stocker-core/sdk/Types/Account";

type CoinInfoProps = {
  children?: ReactNode;
  symbol: any;
  wallet: Wallet;
  currentPrice: number;
};

/**
 * 함수 설명
 */
const CoinInfo = ({ symbol, wallet, currentPrice }: CoinInfoProps) => {
  //   const result = getCoinIcon(code);
  const router = useRouter();
  const calculatedProfit = wallet
    ? ((currentPrice - wallet.avgPrice) * wallet.amount).toFixed(2)
    : 0;

  const calculatedPercent = wallet
    ? wallet.avgPrice > 0
      ? (((currentPrice - wallet.avgPrice) / wallet.avgPrice) * 100).toFixed(2)
      : 0
    : 0;
  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 4,
        marginY: 1,
      }}
    >
      <Typography variant="h6" fontWeight={600}>
        {symbol}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>Owned Coin</Typography>
        <Typography>{wallet ? wallet.amount : 0}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>Average price</Typography>
        <Typography>${wallet ? wallet.avgPrice.toFixed(2) : 0}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>Stock Profit</Typography>
        <Typography color="blue">
          {Number(calculatedProfit) > 0 && "+"}
          {calculatedProfit} ({calculatedPercent}
          %)
        </Typography>
      </Box>
    </Box>
  );
};

export default CoinInfo;
