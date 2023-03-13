import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { TradeResult } from "../../pages/auto/type";
import { convertTime } from "../../utils";
import { LoadingIndicator } from "../Common/LoadingIndicator";
import { ErrorResult } from "./ErrorResult";
import { LogResult } from "./LogResult";
import { TransactionResult } from "./TransactionResult";

type ScriptResultType = {
  scriptData: undefined | TradeResult;
  loading: boolean;
};

export const ScriptResult = ({ scriptData, loading }: ScriptResultType) => {
  const [resultSelect, setResultSelect] = useState("transaction");

  const renderResult = (resultTitle: string) => {
    switch (resultTitle) {
      case "transaction":
        return <TransactionResult transactionList={scriptData?.transactions} />;
      case "log":
        return <LogResult logList={scriptData?.logs} />;
      case "error":
        return <ErrorResult errorList={scriptData?.errors} />;
    }
  };
  useEffect(() => {
    setResultSelect("transaction");
  }, [scriptData]);
  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: 2,
        borderTop: "solid 1px #DFDFDF",
        paddingX: 2,
        paddingY: 1,
        display: "flex",
        flexDirection: "column",
        minHeight: 200,
        maxHeight: 300,
        overflowY: "scroll",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row", marginY: 1 }}>
        <Typography fontWeight={600} sx={{ marginRight: 4 }}>
          Result
        </Typography>
        <Box
          sx={{ marginLeft: 2, cursor: "pointer" }}
          onClick={() => setResultSelect("transaction")}
        >
          Transaction
        </Box>
        <Box
          sx={{ marginLeft: 2, cursor: "pointer" }}
          onClick={() => setResultSelect("log")}
        >
          Logs
        </Box>
        <Box
          sx={{ marginLeft: 2, cursor: "pointer" }}
          onClick={() => setResultSelect("error")}
        >
          Errors
        </Box>
      </Box>

      {scriptData ? (
        <>
          <Box sx={{ display: "flex", flexDirection: "row", marginY: 1 }}>
            <Typography sx={{ marginRight: 2 }}>
              Wallet Result: ${scriptData.account.wallet.toFixed(2)}
            </Typography>
            <Typography>Remaining Coin: {scriptData.account.coin}</Typography>
          </Box>
          {renderResult(resultSelect)}
        </>
      ) : loading ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography color="#AAAAAA">
            Run the script to see the Result!
          </Typography>
        </Box>
      )}
    </Box>
  );
};
