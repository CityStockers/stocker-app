import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React, { FC, ReactNode } from "react";
import Image from "next/image";
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
  const priceData = useQuery(
    ["price", walletInfo.symbol],
    () => getPrice(walletInfo.symbol),
    {
      onSuccess(data) {
        console.log(data);
      },
    }
  );

  const calculateProfit = (currentPrice: number) => {
    const totalBoughtPrice = walletInfo.amount * walletInfo.avgPrice;
    const evaluatedPrice = walletInfo.amount * currentPrice;

    return evaluatedPrice - totalBoughtPrice;
  };
  //   const result = getCoinIcon(code);
  const router = useRouter();
  if (priceData.isLoading) {
    return <Typography>Loading Profit...</Typography>;
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
          calculateProfit(priceData.data.price) < 0 ? "#CF3049" : "#04A56D"
        }
      >
        ${calculateProfit(priceData.data.price).toFixed(2)}
      </Typography>
    </Box>
  );
};

export default CoinProfit;
