import { Box, Typography } from "@mui/material";
import { getAccountTotal } from "../../stocker-core/sdk/Account/getAccountTotal";
import { Account } from "../../stocker-core/sdk/Types/Account";

type Props = {
  account: Account | null;
};

export const Portforlio = ({ account }: Props) => {
  return (
    <Box>
      {account?.wallets.map((wallet, index) => {
        let totalAmount = getAccountTotal(account as Account);
        if (index !== 0) {
          if (wallet.amount > 0) {
            const calculatedAmount = wallet.amount * wallet.avgPrice;
            const percentage =
              totalAmount > 0 ? (calculatedAmount / totalAmount) * 100 : 0;
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
  );
};
