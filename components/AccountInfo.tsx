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

type AccountInfoProps = {
  children?: ReactNode;
};

/**
 * 함수 설명
 */
const AccountInfo = ({}: AccountInfoProps) => {
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
        Account
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>Savings</Typography>
        <Typography>$10000</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>Profit</Typography>
        <Typography color={"red"}>$90 (2.8%)</Typography>
      </Box>
    </Box>
  );
};

export default AccountInfo;
