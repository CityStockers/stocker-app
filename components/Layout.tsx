// components/Layout.js
import { Container, Toolbar } from "@mui/material";
import { useRouter } from "next/router";
import React, { Component, ReactNode } from "react";
import Copyright from "../src/Copyright";
import NavigationBar from "./NavigationBar";

type LayoutProp = {
  children?: ReactNode;
};

const Layout = ({ children }: LayoutProp) => {
  const router = useRouter();
  console.log(router.pathname);
  return (
    <Container
      sx={[
        router.pathname === "/auto"
          ? { width: "100%", height: "80vh" }
          : {
              minWidth: {
                xs: 300,
                sm: 600,
              },
              maxWidth: {
                xs: 350,
                sm: 600,
              },
            },
      ]}
    >
      <NavigationBar />
      <Toolbar />
      {children}
    </Container>
  );
};

export default Layout;
