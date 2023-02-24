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
import useTransaction from "../../stocker-core/sdk/Transaction/useTransaction";
import { useRecoilValue } from "recoil";
import { recoilUserId } from "../../states";
import { db } from "../../utils/firebase";

type AccountInfoProps = {
  children?: ReactNode;
  accountInfo: Account | null;
};

/**
 * 함수 설명
 */
const ProfitInfo = () => {
  const userId = useRecoilValue(recoilUserId);
  const transactionInfo = useTransaction(db, userId);
  //   const result = getCoinIcon(code);
  const router = useRouter();

  if (transactionInfo.loading) {
    return <div>loading...</div>;
  }
  if (transactionInfo.error) {
    return <div>error...</div>;
  }
  console.log(transactionInfo);

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h4" fontWeight={600} marginY={4}>
        Transaction History
      </Typography>
      <Box
        sx={{
          padding: 2,
          width: "100%",
          border: "solid 1px #DFDFDF",
          borderRadius: 2,
          minHeight: 200,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography sx={{ flex: 0.2 }}>Type</Typography>
          <Typography sx={{ flex: 0.2 }}>Symbol</Typography>
          <Typography sx={{ flex: 0.2 }}>Amount</Typography>
          <Typography sx={{ flex: 0.2 }}>Price</Typography>
          <Typography sx={{ flex: 0.2 }}>Time</Typography>
        </Box>
        {transactionInfo &&
          transactionInfo.transaction?.transactions.map((item, index) => {
            if (item.type === "ADD") {
              return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ flex: 0.2 }}>[{item.type}]</Typography>
                  <Typography sx={{ flex: 0.2 }}> {item.symbol}</Typography>
                  <Typography sx={{ flex: 0.2 }}> - </Typography>
                  <Typography sx={{ flex: 0.2 }}>
                    {" "}
                    {Number(item.price).toFixed(2)}
                  </Typography>
                  <Typography sx={{ flex: 0.2 }}> {item.timestamp}</Typography>
                </Box>
              );
            } else {
              return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ flex: 0.2 }}>[{item.type}]</Typography>
                  <Typography sx={{ flex: 0.2 }}> {item.symbol}</Typography>
                  <Typography sx={{ flex: 0.2 }}>{item.amount} </Typography>
                  <Typography sx={{ flex: 0.2 }}>
                    {Number(item.price).toFixed(2)}
                  </Typography>
                  <Typography sx={{ flex: 0.2 }}> {item.timestamp}</Typography>
                </Box>
              );
            }
          })}
      </Box>
    </Box>
  );
};

export default ProfitInfo;
