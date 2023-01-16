import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "../src/Link";
import Copyright from "../src/Copyright";
import NavigationBar from "../components/NavigationBar";
import { Button } from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{
        my: 4,
        display: "flex",
        flex: "auto",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        gutterBottom
        sx={{ textAlign: "center" }}
      >
        Stock Simulator
      </Typography>
      <Typography
        variant="body1"
        component="p"
        gutterBottom
        sx={{ textAlign: "center" }}
      >
        Try practice trading crypto using Virtual Money without any loss!
      </Typography>
      <Link href="/login" color="secondary" underline="none">
        <Button variant="contained">login With Google</Button>
      </Link>
    </Box>
  );
}
