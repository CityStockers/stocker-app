import { Box, Button, Typography, withStyles } from "@mui/material";
import React, { FC, ReactNode, use, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DUMMY_BNB_PRICE } from "../../constant/CoinData";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import AccountInfo from "../../components/AccountInfo";
import CoinInfo from "../../components/CoinInfo";
import useAccount from "../../stocker-core/sdk/Account/useAccount";
import { db } from "../../utils/firebase";
import { recoilUserId } from "../../states";
import { useRecoilValue } from "recoil";
import { useQuery } from "react-query";
import { getPriceList } from "../../api/binanceAPI";
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
  const [interval, setInterval] = useState("1d");
  const userId = useRecoilValue(recoilUserId);
  const accountInfo = useAccount(db, userId);

  let options = {
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
      y: { grid: { display: false }, display: false },
    },
  };

  const priceListData = useQuery(
    ["priceList", symbol, interval],
    () => getPriceList(symbol as string, interval),
    {
      onSuccess(data) {
        console.log(data);
      },
    }
  );

  const data = {
    labels: Array(100).fill("날짜"),
    datasets: [
      {
        data: priceListData.data,
      },
    ],
  };

  useEffect(() => {
    if (typeof symbol === "string") {
      let ws = new WebSocket(
        `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@trade`
      );
      ws.onmessage = (event) => {
        let stockObject = JSON.parse(event.data);
        setPrice(stockObject.p);
      };

      return () => {
        ws.close();
      };
    }
  }, [symbol]);

  if (priceListData.isLoading) {
    return <Typography>isLoading...</Typography>;
  }

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
            {(Math.round(price * 100) / 100).toFixed(5)}
          </Typography>
          <Typography>
            {(Math.round((priceListData.data[0] - price) * 100) / 100).toFixed(
              2
            )}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          maxHeight: {
            xs: 400 * 0.6,
            sm: 600,
          },
        }}
      >
        <Line data={data} options={options} />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: 300,
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
        <AccountInfo accountInfo={accountInfo.account} />
        <CoinInfo symbol={symbol} />
        <Box maxWidth={300} sx={{ marginY: 2 }}>
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
    </Box>
  );
};

export default TradeSymbol;
