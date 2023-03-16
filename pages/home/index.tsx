import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { FC, ReactNode, useEffect, useState } from "react";
import useAccount from "../../stocker-core/sdk/Account/useAccount";
import { db } from "../../utils/firebase";
import { useRecoilValue } from "recoil";
import { recoilUserId } from "../../states";
import { Account } from "../../stocker-core/sdk/Types/Account";
import { getAccountTotal } from "../../stocker-core/sdk/Account/getAccountTotal";
import ProfitInfo from "../../components/Home/ProfitInfo";
import { TransactionHistory } from "../../components/Home/TransactionHistory";
import { LoadingIndicator } from "../../components/Common/LoadingIndicator";
import { DoughnutChart } from "../../components/Home/DoughnutChart";
import AddMoneyModal from "../../components/Home/AddMoneyModal";
import { Portforlio } from "../../components/Home/Portfolio";

type TradeProps = {
  children?: ReactNode;
};

const Home: FC<TradeProps> = () => {
  const userId = useRecoilValue(recoilUserId);
  const accountInfo = useAccount(db, userId);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  if (accountInfo.loading) {
    return <LoadingIndicator />;
  }
  if (accountInfo.error) {
    return <div>error...</div>;
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" fontWeight={600} marginY={1}>
        Portforlio
      </Typography>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 2,
          border: "1px solid #DFDFDF",
          padding: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            marginBottom: 4,
          }}
        >
          <Box
            sx={{
              width: 280,
              height: 280,
              marginRight: 1,
            }}
          >
            <DoughnutChart account={accountInfo.account} />
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: 3,
              borderLeft: "1px solid #DFDFDF",
            }}
          >
            <Portforlio account={accountInfo.account} />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="outlined"
                onClick={handleClickOpen}
                sx={{ width: 150 }}
              >
                + Add Money
              </Button>
            </Box>
          </Box>
        </Box>
        <ProfitInfo accountInfo={accountInfo.account} />
      </Box>
      <AddMoneyModal
        open={open}
        setOpen={setOpen}
        account={accountInfo.account}
      />
      <TransactionHistory />
    </Box>
  );
};

export default Home;
