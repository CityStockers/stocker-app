import { Box, Typography } from "@mui/material";
import React, { FC, ReactNode } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Wallet } from "../stocker-core/sdk/Types/Account";

type CoinInfoProps = {
  children?: ReactNode;
  symbol: any;
  wallet: Wallet;
};

/**
 * 함수 설명
 */
const CoinInfo = ({ symbol, wallet }: CoinInfoProps) => {
  //   const result = getCoinIcon(code);
  const router = useRouter();

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
        <Typography>${wallet ? wallet.avgPrice : 0}</Typography>
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
