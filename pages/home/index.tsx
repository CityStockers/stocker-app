import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { FC, ReactNode, useEffect, useState } from "react";
import useAccount from "../../stocker-core/sdk/Account/useAccount";
import { db } from "../../utils/firebase";
import { useRecoilValue } from "recoil";
import { recoilUserId } from "../../states";
import { Account } from "../../stocker-core/sdk/Types/Account";
import { getAccountTotal } from "../../stocker-core/sdk/Account/getAccountTotal";
import ProfitInfo from "../../components/Home/ProfitInfo";
import TransactionHistory from "../../components/Home/TransactionHistory";
import { LoadingIndicator } from "../../components/Common/LoadingIndicator";
import { DoughnutChart } from "../../components/Home/DoughnutChart";
import AddMoneyModal from "../../components/Home/AddMoneyModal";

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
            <Box>
              {accountInfo.account?.wallets.map((wallet, index) => {
                let totalAmount = getAccountTotal(
                  accountInfo.account as Account
                );
                if (index !== 0) {
                  if (wallet.amount > 0) {
                    const calculatedAmount = wallet.amount * wallet.avgPrice;
                    const percentage =
                      totalAmount > 0
                        ? (calculatedAmount / totalAmount) * 100
                        : 0;
                    return (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography fontSize={14}>{wallet.symbol}</Typography>
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                          <Typography fontSize={14} sx={{ marginRight: 1 }}>
                            ${(wallet.amount * wallet.avgPrice).toFixed(2)}
                          </Typography>
                          <Typography fontSize={14}>
                            ({percentage.toFixed(2)}%)
                          </Typography>
                        </Box>
                      </Box>
                    );
                  }
                } else {
                  const percentage =
                    totalAmount > 0 ? (wallet.amount / totalAmount) * 100 : 0;
                  return (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography fontSize={14}>{wallet.symbol}</Typography>
                      <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <Typography fontSize={14} sx={{ marginRight: 1 }}>
                          ${wallet.amount.toFixed(2)}
                        </Typography>
                        <Typography fontSize={14}>
                          ({percentage.toFixed(2)}%)
                        </Typography>
                      </Box>
                    </Box>
                  );
                }
              })}
            </Box>
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
