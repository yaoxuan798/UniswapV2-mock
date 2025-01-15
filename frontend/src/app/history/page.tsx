"use client"
import React from "react";
import HistoryComponent from "@/app/components/HistoryComponent";
import { Typography, Box } from "@mui/material";

const HistoryPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Transaction History
      </Typography>
      <HistoryComponent />
    </Box>
  );
};

export default HistoryPage;
