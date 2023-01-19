import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "../src/Link";
import Copyright from "../src/Copyright";
import NavigationBar from "../components/NavigationBar";
import { Button } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const googleAuth = new GoogleAuthProvider();
  const login = async () => {
    const result = await signInWithPopup(auth, googleAuth)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;

        // ...
        console.log(token, user);
        router.push("./home");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

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

      <Button variant="contained" onClick={login}>
        login With Google
      </Button>
    </Box>
  );
}
