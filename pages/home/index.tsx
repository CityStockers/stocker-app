import { Box, Typography } from "@mui/material";
import React, { FC, ReactNode } from "react";
import AccountInfo from "../../components/AccountInfo";
import Chart from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);

type TradeProps = {
  children?: ReactNode;
};

/**
 * 함수 설명
 *
 * @param {any} example 함수가 받는 파라 미터 설명
 * @returns 리턴 설명
 */
const Home: FC<TradeProps> = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography>Hello, User123!</Typography>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid black",
          padding: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              minWidth: {
                xs: 150,
                sm: 300,
              },
              maxWidth: {
                xs: 150,
                sm: 300,
              },
              minHeight: {
                xs: 150,
                sm: 300,
              },
              maxHeight: {
                xs: 160,
                sm: 300,
              },
            }}
          >
            <Doughnut data={{ datasets: [{ data: [1, 2, 3] }] }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography>USD 100</Typography>
            <Typography>BNB 1400</Typography>
            <Typography>ETH 2300</Typography>
          </Box>
        </Box>
        <AccountInfo />
      </Box>

      <Box sx={{ width: "100%" }}>
        <Typography>Transaction List</Typography>
        <Box>거래 내역</Box>
      </Box>
    </Box>
  );
};

export default Home;
