import { Box, Typography } from "@mui/material";
import React, { FC, ReactNode } from "react";
import { useRouter } from "next/router";
import { Account, Wallet } from "../../stocker-core/sdk/Types/Account";
import { useQuery } from "react-query";
import { getPrice } from "../../api/binanceAPI";

type WalletInfoProps = {
  children?: ReactNode;
  walletInfo: Wallet;
};

/**
 */
const CoinProfit = ({ walletInfo }: WalletInfoProps) => {
  const priceData = useQuery(["price", walletInfo.symbol], () =>
    getPrice(walletInfo.symbol)
  );

  const calculateProfit = (currentPrice: number | undefined) => {
    if (!currentPrice) {
      return 0;
    }
    const totalBoughtPrice = walletInfo.amount * walletInfo.avgPrice;
    const evaluatedPrice = walletInfo.amount * currentPrice;
    return evaluatedPrice - totalBoughtPrice;
  };
  //   const result = getCoinIcon(code);
  const router = useRouter();
  if (priceData.isLoading || priceData.isError) {
    return <Typography>Loading Profit...</Typography>;
  }

  if (priceData.isError) {
    return <Typography>Profit Error</Typography>;
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography>{walletInfo.symbol}</Typography>
      <Typography
        color={
          calculateProfit(priceData.data?.price) < 0 ? "#CF3049" : "#04A56D"
        }
      >
        ${calculateProfit(priceData.data?.price).toFixed(2)}
      </Typography>
    </Box>
  );
};

export default CoinProfit;
