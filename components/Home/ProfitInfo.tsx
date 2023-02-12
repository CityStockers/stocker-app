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
import { Account } from "../../stocker-core/sdk/Types/Account";
import CoinProfit from "./coinProfit";

type AccountInfoProps = {
  children?: ReactNode;
  accountInfo: Account | null;
};

/**
 * 함수 설명
 */
const ProfitInfo = ({ accountInfo }: AccountInfoProps) => {
  //   const result = getCoinIcon(code);
  const router = useRouter();
  return (
    <Box
      sx={{
        paddingX: 2,
        paddingY: 2,
        width: "100%",
        marginY: 1,
      }}
    >
      <Typography variant="h6" fontWeight={600}>
        Profit
      </Typography>
      {accountInfo &&
        (accountInfo.wallets.length === 1 ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              minHeight: 100,
            }}
          >
            <Typography>
              You have no Coin in the wallet, Start the Trade in Trade Page!
            </Typography>
          </Box>
        ) : (
          accountInfo.wallets.map((item, index) => {
            if (index !== 0) {
              return <CoinProfit walletInfo={item} key={index} />;
            }
          })
        ))}
    </Box>
  );
};

export default ProfitInfo;
