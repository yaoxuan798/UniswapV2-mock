"use client"
import React from "react";
import SwapComponent from "@/app/components/SwapComponent";
import { Typography, Box } from "@mui/material";

const SwapPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Swap Tokens
      </Typography>
      <SwapComponent />
    </Box>
  );
};

export default SwapPage;
