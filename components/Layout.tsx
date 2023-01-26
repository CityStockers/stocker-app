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
    <Container maxWidth="md">
      <NavigationBar />
      <Toolbar />
      {children}
    </Container>
  );
};

export default Layout;
