import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React, { FC, ReactNode } from "react";
import { getCoinIcon } from "../../api/coinIcon";
import Image from "next/image";
import coin from "../../asset/coinIcons/btc.svg";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getPrice } from "../../api/binanceAPI";

type TradeCoinCardProps = {
  children?: ReactNode;
  code: string;
  name: string;
  symbol: string;
};

/**
 * 함수 설명
 *
 * @param {any} example 함수가 받는 파라 미터 설명
 * @returns 리턴 설명
 */
const TradeCoinCard = ({ symbol, code, name }: TradeCoinCardProps) => {
  //   const result = getCoinIcon(code);
  const router = useRouter();
  const exchangeInfoData = useQuery(["price", symbol], () => getPrice(symbol), {
    onSuccess(data) {
      console.log(data);
    },
  });
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button onClick={() => router.push(`/trade/${symbol}`)}>
        <Card variant="outlined" sx={{ minWidth: 250 }}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
              <Image
                alt="coinlogo"
                src={`../../coinIcons/${code}.svg`}
                width={30}
                height={30}
              />
              <Typography
                variant="h5"
                component="div"
                fontSize={24}
                sx={{ marginLeft: 1 }}
              >
                {name}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Typography variant="subtitle2" sx={{ marginRight: 2 }}>
                price
              </Typography>
              <Typography variant="subtitle2">
                {exchangeInfoData.data?.price}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Button>
    </Box>
  );
};

export default TradeCoinCard;
