import { Box, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import { Account } from "../../stocker-core/sdk/Types/Account";
import useTransaction from "../../stocker-core/sdk/Transaction/useTransaction";
import { useRecoilValue } from "recoil";
import { recoilUserId } from "../../states";
import { db } from "../../utils/firebase";
import { compare, convertTime } from "../../utils";
import { LoadingIndicator } from "../Common/LoadingIndicator";
import { getCoinInfo } from "../../constant/CoinData";

export const TransactionHistory = () => {
  const userId = useRecoilValue(recoilUserId);
  const transactionInfo = useTransaction(db, userId);

  const router = useRouter();

  if (transactionInfo.loading) {
    return <LoadingIndicator />;
  }
  if (transactionInfo.error) {
    return <div>error...</div>;
  }

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
          maxHeight: 500,
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography sx={{ flex: 0.2 }} fontWeight="600">
            Type
          </Typography>
          <Typography sx={{ flex: 0.2 }} fontWeight="600">
            Symbol
          </Typography>
          <Typography sx={{ flex: 0.2 }} fontWeight="600">
            Amount
          </Typography>
          <Typography sx={{ flex: 0.2 }} fontWeight="600">
            Price
          </Typography>
          <Typography sx={{ flex: 0.2 }} fontWeight="600">
            Time
          </Typography>
        </Box>
        {transactionInfo &&
          transactionInfo.transaction?.transactions
            .sort(compare)
            .map((item, index) => {
              if (item.type === "ADD") {
                return (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginY: 1,
                      borderBottom: "1px solid #DFDFDF",
                    }}
                  >
                    <Typography
                      sx={{ flex: 0.2 }}
                      color={"#04A56D"}
                      fontWeight="500"
                    >
                      [{item.type}]
                    </Typography>
                    <Typography sx={{ flex: 0.2 }} fontSize={14}>
                      {getCoinInfo(item.symbol)?.name}
                    </Typography>
                    <Typography sx={{ flex: 0.2 }} fontSize={14}>
                      -
                    </Typography>
                    <Typography sx={{ flex: 0.2 }} fontSize={14}>
                      {Number(item.price).toFixed(2)}
                    </Typography>
                    <Typography sx={{ flex: 0.2 }} fontSize={12}>
                      {convertTime(item.timestamp)}
                    </Typography>
                  </Box>
                );
              } else {
                return (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginY: 1,
                      borderBottom: "1px solid #DFDFDF",
                    }}
                  >
                    <Typography
                      color={item.type === "BUY" ? "#1B76D2" : "#CF3049"}
                      fontWeight="500"
                      sx={{ flex: 0.2 }}
                    >
                      [{item.type}]
                    </Typography>
                    <Typography sx={{ flex: 0.2 }} fontSize={14}>
                      {getCoinInfo(item.symbol)?.name}
                    </Typography>
                    <Typography sx={{ flex: 0.2 }} fontSize={14}>
                      {item.amount}
                    </Typography>
                    <Typography sx={{ flex: 0.2 }} fontSize={14}>
                      {Number(item.price).toFixed(2)}
                    </Typography>
                    <Typography sx={{ flex: 0.2 }} fontSize={12}>
                      {convertTime(item.timestamp)}
                    </Typography>
                  </Box>
                );
              }
            })}

        {transactionInfo.transaction?.transactions.length === 0 && (
          <Typography color={"#AAAAAA"} sx={{ marginTop: 8 }}>
            You have no transaction, Start Add money and Trade in Trade Page!
          </Typography>
        )}
      </Box>
    </Box>
  );
};
