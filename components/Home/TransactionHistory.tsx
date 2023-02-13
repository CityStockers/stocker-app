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
        {transactionInfo &&
          transactionInfo.transaction?.transactions.map((item, index) => {
            if (item.type === "ADD") {
              return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography>[{item.type}]</Typography>
                  <Typography> {item.symbol}</Typography>
                  <Typography> </Typography>
                  <Typography> {item.price}</Typography>
                  <Typography> {item.timestamp}</Typography>
                </Box>
              );
            } else {
              return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography>[{item.type}]</Typography>
                  <Typography> {item.symbol}</Typography>
                  <Typography>{item.amount} </Typography>
                  <Typography> {item.price}</Typography>
                  <Typography> {item.timestamp}</Typography>
                </Box>
              );
            }
          })}
      </Box>
    </Box>
  );
};

export default ProfitInfo;
