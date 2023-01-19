import { Box, Typography } from "@mui/material";
import React, { FC, ReactNode } from "react";

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
    <Box>
      <Typography>이곳에 다양한 정보를 적을 예정</Typography>
    </Box>
  );
};

export default Home;
