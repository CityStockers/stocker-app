import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { recoilUserId } from "../../states";
import addMoney from "../../stocker-core/sdk/Transaction/addMoney";
import { db } from "../../utils/firebase";
import { Account } from "../../stocker-core/sdk/Types/Account";
import { useRecoilValue } from "recoil";

type Props = {
  children?: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  account: Account | null;
};

export default function AddMoneyModal({ open, setOpen, account }: Props) {
  const [addAmount, setAddAmount] = useState("");
  const userId = useRecoilValue(recoilUserId);
  const handleClose = () => {
    setOpen(false);
  };

  const handleAddMoney = (amount: number, account: Account) => {
    const accountCopy = { ...account };
    accountCopy.wallets[0].amount += amount;
    db.collection("accounts").doc(userId).set(accountCopy);
    addMoney(db, userId, "USD", 0, Number(addAmount));
  };

  return (
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
          onClick={async () => {
            await handleAddMoney(Number(addAmount), account as Account);
            handleClose();
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
