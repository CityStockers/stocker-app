import { Box, Button, Typography } from "@mui/material";
import React, { FC, ReactNode, useState } from "react";
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
import ProfitInfo from "../../components/Home/ProfitInfo";

Chart.register(CategoryScale);

type TradeProps = {
  children?: ReactNode;
};

const Home: FC<TradeProps> = () => {
  const userId = useRecoilValue(recoilUserId);
  const accountInfo = useAccount(db, userId);
  const [open, setOpen] = useState(false);
  const [addAmount, setAddAmount] = useState("");
  if (accountInfo.loading) {
    return <div>loading...</div>;
  }
  if (accountInfo.error) {
    return <div>error...</div>;
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addMoney = (amount: number, account: Account) => {
    const accountCopy = { ...account };
    accountCopy.wallets[0].amount = amount;
    db.collection("accounts").doc(userId).set(accountCopy);
  };

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
          }}
        >
          <Box
            sx={{
              width: 300,
              height: 300,
            }}
          >
            <Doughnut data={{ datasets: [{ data: [1, 2, 3] }] }} />
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography>USD</Typography>
              <Typography>${accountInfo.account?.wallets[0].amount}</Typography>
            </Box>
            {accountInfo.account?.wallets.map((wallet, index) => {
              if (index !== 0) {
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
                    <Typography>{wallet.symbol}</Typography>
                    <Typography>${wallet.amount}</Typography>
                  </Box>
                );
              }
            })}
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

      <Box sx={{ width: "100%" }}>
        <Typography variant="h4" fontWeight={600} marginY={1}>
          Transaction History
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "center",
            borderRadius: 2,
            border: "1px solid #DFDFDF",
            padding: 1,
            minHeight: 200,
          }}
        >
          거래 내역
        </Box>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Money</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Write the amount of money you would like to add.
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
              addMoney(Number(addAmount), accountInfo.account as Account);
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
