"use client"
import React from "react";
import WalletConnectComponent from "@/app/components/WalletConnect";
import SwapComponent from "@/app/components/SwapComponent";
import LiquidityComponent from "@/app/components/LiquidityComponent";
import HistoryComponent from "@/app/components/HistoryComponent";
import { Typography, Box } from "@mui/material";

const HomePage: React.FC = () => {
  return (
    <Box>
      <WalletConnectComponent />
      <SwapComponent />
      <LiquidityComponent />
      <HistoryComponent />
    </Box>
  );
};

export default HomePage;
