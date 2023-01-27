// components/Layout.js
import { Container, Toolbar } from "@mui/material";
import React, { Component, ReactNode } from "react";
import Copyright from "../src/Copyright";
import NavigationBar from "./NavigationBar";

type LayoutProp = {
  children?: ReactNode;
};

const Layout = ({ children }: LayoutProp) => {
  return (
    <Container
      sx={{
        minWidth: {
          xs: 300,
          sm: 600,
        },
        maxWidth: {
          xs: 350,
          sm: 600,
        },
      }}
    >
      <NavigationBar />
      <Toolbar />
      {children}
    </Container>
  );
};

export default Layout;
