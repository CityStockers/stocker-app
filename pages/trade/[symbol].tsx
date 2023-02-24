import { Box, Button, Typography, withStyles } from "@mui/material";
import React, { FC, ReactNode, use, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCoinName } from "../../constant/CoinData";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import AccountInfo from "../../components/AccountInfo";
import CoinInfo from "../../components/CoinInfo";
import useAccount from "../../stocker-core/sdk/Account/useAccount";
import { db } from "../../utils/firebase";
import { recoilUserId } from "../../states";
import { useRecoilValue } from "recoil";
import { useQueries, useQuery } from "react-query";
import { getPriceList } from "../../api/binanceAPI";
import BuyCoin from "../../components/Trade/BuyCoin";
import SellCoin from "../../components/Trade/SellCoin";
import { Wallet } from "../../stocker-core/sdk/Types/Account";
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
  const listOfIntervals = ["15m", "1h", "8h", "1d", "3d"];
  const [price, setPrice] = useState(0);
  const [interval, setInterval] = useState("15m");
  const userId = useRecoilValue(recoilUserId);
  const accountInfo = useAccount(db, userId);
  const [openBuy, setOpenBuy] = useState(false);
  const [openSell, setOpenSell] = useState(false);
  const [indexOfWallet, setIndexOfWallet] = useState(-1);

  const priceListDatas = useQueries(
    listOfIntervals.map((item) => {
      return {
        queryKey: ["priceList", symbol, item],
        queryFn: () => getPriceList(symbol as string, item),
      };
    })
  );

  const priceListData = useQuery(
    ["priceList", symbol, interval],
    () => getPriceList(symbol as string, interval),
    {
      onSuccess(data) {
        console.log(data);
      },
    }
  );

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

  useEffect(() => {
    if (accountInfo.account) {
      const checkWalletIndex = accountInfo.account.wallets.findIndex(
        (item) => item.symbol === symbol
      );
      setIndexOfWallet(checkWalletIndex);
    }
  }, [accountInfo.account]);

  if (priceListData.isLoading || accountInfo.loading) {
    return <Typography>isLoading...</Typography>;
  }

  let priceDifference = price - priceListData.data[0];
  let pricePercentage = Math.round(
    ((price - priceListData.data[0]) / price) * 100
  ).toFixed(2);

  return (
    <Box>
      <Box sx={{ marginTop: 3 }}>
        <Typography variant="h4" fontWeight={800}>
          {getCoinName(symbol as string)}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" fontWeight={600} sx={{ marginRight: 1 }}>
            {Math.round(price).toFixed(2)}
          </Typography>
          <Typography
            variant="h6"
            fontWeight={400}
            color={price - priceListData.data[0] < 0 ? "#CF3049" : "#04A56D"}
          >
            {price - priceListData.data[0] < 0 ? "" : "+"}
            {priceDifference.toFixed(2)}
            {"  "}({pricePercentage}
            %)
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
        <Box sx={{ display: "flex", justifyContent: "center", marginY: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: 300,
            }}
          >
            <Button
              variant={interval === "15m" ? "contained" : "outlined"}
              size="small"
              sx={{ padding: 0, minWidth: 40 }}
              onClick={() => {
                setInterval("15m");
              }}
            >
              1d
            </Button>
            <Button
              variant={interval === "1h" ? "contained" : "outlined"}
              size="small"
              sx={{ padding: 0, minWidth: 40 }}
              onClick={() => {
                setInterval("1h");
              }}
            >
              5d
            </Button>
            <Button
              variant={interval === "8h" ? "contained" : "outlined"}
              size="small"
              sx={{ padding: 0, minWidth: 40 }}
              onClick={() => {
                setInterval("8h");
              }}
            >
              1m
            </Button>
            <Button
              variant={interval === "1d" ? "contained" : "outlined"}
              size="small"
              sx={{ padding: 0, minWidth: 40 }}
              onClick={() => {
                setInterval("1d");
              }}
            >
              6m
            </Button>
            <Button
              variant={interval === "3d" ? "contained" : "outlined"}
              size="small"
              sx={{ padding: 0, minWidth: 40 }}
              onClick={() => {
                setInterval("3d");
              }}
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
          border: "solid 1px #DFDFDF",
          padding: 2,
          borderRadius: 2,
        }}
      >
        <AccountInfo accountInfo={accountInfo.account} />
        <CoinInfo
          symbol={symbol}
          wallet={accountInfo.account?.wallets[indexOfWallet] as Wallet}
          currentPrice={price}
        />
        <Box maxWidth={300} sx={{ marginY: 2 }}>
          <Button
            variant="outlined"
            size="large"
            sx={{
              width: 130,
              marginRight: 1,
            }}
            onClick={() => {
              setOpenBuy(true);
            }}
          >
            buy
          </Button>
          <Button
            onClick={() => {
              setOpenSell(true);
            }}
            variant="outlined"
            size="large"
            sx={{ width: 130 }}
            color="error"
          >
            sell
          </Button>
        </Box>
      </Box>
      <BuyCoin
        price={price}
        open={openBuy}
        setOpen={setOpenBuy}
        title={symbol as string}
        pricePercentage={pricePercentage}
        priceDifference={priceDifference}
        availableSaving={accountInfo.account?.wallets[0].amount as number}
      />
      <SellCoin
        price={price}
        open={openSell}
        setOpen={setOpenSell}
        title={symbol as string}
        pricePercentage={pricePercentage}
        priceDifference={priceDifference}
        availableCoin={
          accountInfo.account?.wallets[indexOfWallet]?.amount as number
        }
      />
    </Box>
  );
};

export default TradeSymbol;
