import { Box, Button, Typography } from "@mui/material";
import React, { FC, ReactNode, useEffect, useState } from "react";
import AccountInfo from "../../components/AccountInfo";
import Chart from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import useAccount from "../../stocker-core/sdk/Account/useAccount";
import { db } from "../../utils/firebase";
import { useRecoilValue } from "recoil";
import { recoilUserId } from "../../states";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Account } from "../../stocker-core/sdk/Types/Account";
import { getAccountTotal } from "../../stocker-core/sdk/Account/getAccountTotal";
import addMoney from "../../stocker-core/sdk/Transaction/addMoney";
import ProfitInfo from "../../components/Home/ProfitInfo";
import TransactionHistory from "../../components/Home/TransactionHistory";

Chart.register(CategoryScale);

type TradeProps = {
  children?: ReactNode;
};
type DoughnutData = {
  labels: string[];
  datasets: [{ data: number[]; backgroundColor: string[] }];
};

const Home: FC<TradeProps> = () => {
  const userId = useRecoilValue(recoilUserId);
  const accountInfo = useAccount(db, userId);
  const [open, setOpen] = useState(false);
  const [addAmount, setAddAmount] = useState("");
  const [chartData, setChartData] = useState<DoughnutData>({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          "#0074D9",
          "#FF4136",
          "#2ECC40",
          "#FF851B",
          "#7FDBFF",
          "#B10DC9",
          "#FFDC00",
          "#001f3f",
          "#39CCCC",
          "#01FF70",
          "#85144b",
          "#F012BE",
          "#3D9970",
          "#111111",
          "#AAAAAA",
        ],
      },
    ],
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddMoney = (amount: number, account: Account) => {
    const accountCopy = { ...account };
    accountCopy.wallets[0].amount += amount;
    db.collection("accounts").doc(userId).set(accountCopy);
    addMoney(db, userId, "USD", 0, Number(addAmount));
  };

  useEffect(() => {
    let doughnutData: DoughnutData = {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [
            "#0074D9",
            "#FF4136",
            "#2ECC40",
            "#FF851B",
            "#7FDBFF",
            "#B10DC9",
            "#FFDC00",
            "#001f3f",
            "#39CCCC",
            "#01FF70",
            "#85144b",
            "#F012BE",
            "#3D9970",
            "#111111",
            "#AAAAAA",
          ],
        },
      ],
    };
    accountInfo.account?.wallets.forEach((item, index) => {
      console.log(Number(item.avgPrice) * Number(item.amount));
      doughnutData.labels.push(item.symbol);
      if (index === 0) {
        doughnutData.datasets[0].data.push(Number(item.amount));
      } else {
        doughnutData.datasets[0].data.push(
          Number(item.avgPrice) * Number(item.amount)
        );
      }
      setChartData(doughnutData);
    });
  }, [accountInfo.account?.wallets]);

  if (accountInfo.loading) {
    return <div>loading...</div>;
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
            <Doughnut data={chartData} />
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
                  const calculatedAmount = wallet.amount * wallet.avgPrice;
                  const percentage = (calculatedAmount / totalAmount) * 100;
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
                } else {
                  const percentage = (wallet.amount / totalAmount) * 100;
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
                          ${wallet.amount}
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

      <TransactionHistory />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Money</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Write the amount of USD money you would like to add.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Amount of money"
            type="number"
            variant="standard"
            value={addAmount}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setAddAmount(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              handleAddMoney(Number(addAmount), accountInfo.account as Account);
              handleClose();
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Home;
