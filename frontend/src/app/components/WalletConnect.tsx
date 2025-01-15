"use client"
import React, { useContext } from "react";
import { Web3Context } from "@/app/context/Web3Context";
import { Button, Box, Typography } from "@mui/material";

const WalletConnectComponent: React.FC = () => {
    const { connectMetaMask, connectWalletConnect, account, disconnect } = useContext(Web3Context);

    return (
        <Box sx={{ marginY: 2 }}>
            {account ? (
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="body1">Connected: {account}</Typography>
                    <Button variant="contained" color="secondary" onClick={disconnect}>
                        Disconnect
                    </Button>
                </Box>
            ) : (
                <Box display="flex" gap={2}>
                    <Button variant="contained" onClick={connectMetaMask}>
                        Connect MetaMask
                    </Button>
                    <Button variant="contained" onClick={connectWalletConnect}>
                        Connect WalletConnect
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default WalletConnectComponent;
