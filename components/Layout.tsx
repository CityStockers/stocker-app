// components/Layout.js
import { Container, Toolbar } from "@mui/material";
import React, { Component } from "react";
import Copyright from "../src/Copyright";
import NavigationBar from "./NavigationBar";

const Layout = ({ children }) => {
  return (
    <Container maxWidth="md">
      <NavigationBar />
      <Toolbar />
      {children}
      <Copyright />
    </Container>
  );
};

export default Layout;
