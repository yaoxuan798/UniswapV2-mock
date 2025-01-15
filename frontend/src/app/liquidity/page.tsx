"use client"
import React from "react";
import LiquidityComponent from "@/app/components/LiquidityComponent";
import { Typography, Box } from "@mui/material";

const LiquidityPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Manage Liquidity
      </Typography>
      <LiquidityComponent />
    </Box>
  );
};

export default LiquidityPage;