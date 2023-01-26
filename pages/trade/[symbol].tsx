import { Box, Button, Typography, withStyles } from "@mui/material";
import React, { FC, ReactNode, use, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DUMMY_BNB_PRICE } from "../../constant/CoinData";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import { borderColor } from "@mui/system";
Chart.register(CategoryScale);

type TradeSymbolProps = {
  children?: ReactNode;
};

/**
 * 함수 설명
 *
 * @param {any} example 함수가 받는 파라 미터 설명
 * @returns 리턴 설명
 */
const TradeSymbol: FC<TradeSymbolProps> = () => {
  const router = useRouter();
  const symbol = router.query.symbol;
  const [price, setPrice] = useState(0);

  const processPriceList = () => {
    const resultData: number[] = [];
    DUMMY_BNB_PRICE.forEach((element) => {
      resultData.push(Number(element[4]));
    });

    return resultData;
  };

  const data = {
    labels: Array(78).fill("날짜"),
    datasets: [
      {
        data: processPriceList(),
      },
    ],
  };

  const options = {
    elements: {
      point: {
        radius: 1.5,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: { grid: { display: false, drawTicks: false }, display: false },
      y: {
        grid: { display: false },
        display: false,
        min: Math.min(...processPriceList()) - 1,
        max: Math.max(...processPriceList()) + 1,
        stepSize: 1,
      },
    },
  };

  console.log(price, symbol);

  useEffect(() => {
    let ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@trade`);
    ws.onmessage = (event) => {
      console.log(event.data);
      let stockObject = JSON.parse(event.data);
      setPrice(stockObject.p);
    };

    return () => {
      ws.close();
    };
  }, [symbol]);
  processPriceList();
  return (
    <Box>
      <Box sx={{ marginTop: 3 }}>
        <Typography>{symbol}</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography sx={{ marginRight: 1 }}>
            {(Math.round(price * 100) / 100).toFixed(2)}
          </Typography>
          <Typography>
            {(Math.round((processPriceList()[0] - price) * 100) / 100).toFixed(
              2
            )}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ height: "60vw" }}>
        <Line data={data} options={options} />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: 250,
            }}
          >
            <Button
              variant="outlined"
              size="small"
              sx={{ padding: 0, minWidth: 40 }}
            >
              1d
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{ padding: 0, minWidth: 40 }}
            >
              5d
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{ padding: 0, minWidth: 40 }}
            >
              1m
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{ padding: 0, minWidth: 40 }}
            >
              6m
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{ padding: 0, minWidth: 40 }}
            >
              1y
            </Button>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            paddingX: 2,
            paddingY: 2,
            backgroundColor: "#FAF9FF",
            width: 300,
            borderRadius: 4,
            border: "1px solid #DFDFDF",
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
        <Box
          sx={{
            paddingX: 2,
            paddingY: 2,
            backgroundColor: "#FAF9FF",
            width: 300,
            borderRadius: 4,
            border: "1px solid #DFDFDF",
            marginTop: 2,
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            {symbol} Stock
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>Owned Stocks</Typography>
            <Typography>3</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>Average price per stock</Typography>
            <Typography>$230</Typography>
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

        <Box maxWidth={300}>
          <Button
            variant="outlined"
            size="large"
            sx={{
              width: 140,
              marginRight: 1,
            }}
          >
            buy
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{ width: 140 }}
            color="error"
          >
            sell
          </Button>
        </Box>
        <Box sx={{ marginTop: 1 }}>
          <Button
            variant="outlined"
            size="large"
            sx={{ width: 288 }}
            color="secondary"
          >
            Auto
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default TradeSymbol;
