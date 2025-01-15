"use client"
import React, { useState, useContext } from "react";
import { Web3Context } from "@/app/context/Web3Context";
import { ethers, parseUnits } from "ethers";
import { TextField, Button, Box, Typography } from "@mui/material";
import { CONFIG } from "../config";

const LiquidityComponent: React.FC = () => {
    const { signer, account } = useContext(Web3Context);
    const [amount0, setAmount0] = useState<string>("");
    const [amount1, setAmount1] = useState<string>("");

    const handleAddLiquidity = async () => {
        if (!signer) {
            alert("Please connect your wallet.");
            return;
        }

        const contractAddress = CONFIG.UNISWAP_V2_CONTRACT_ADDRESS;
        const abi = [
            "function addLiquidity(uint256 amount0, uint256 amount1) external",
        ];
        const contract = new ethers.Contract(contractAddress, abi, signer);

        try {
            const amount0Parsed = parseUnits(amount0, 18);
            const amount1Parsed = parseUnits(amount1, 6);
            const tx = await contract.addLiquidity(amount0Parsed, amount1Parsed);
            await tx.wait();
            alert("Liquidity added successfully");

            // 记录交易历史
            const txHash = tx.hash;
            const newTx = {
                hash: txHash,
                description: `Added liquidity: ${amount0} MockERC20 and ${amount1} MOCK_USDC`,
                timestamp: Math.floor(Date.now() / 1000),
            };
            const existingTx = localStorage.getItem(`tx_${account}`);
            const txArray = existingTx ? JSON.parse(existingTx) : [];
            txArray.unshift(newTx);
            localStorage.setItem(`tx_${account}`, JSON.stringify(txArray));
        } catch (error) {
            console.error("Add liquidity failed:", error);
            alert("Add liquidity failed");
        }
    };

    return (
        <Box sx={{ marginY: 4 }}>
            <Typography variant="h5" gutterBottom>
                Add Liquidity
            </Typography>
            <TextField
                label="MockERC20 Amount"
                type="number"
                value={amount0}
                onChange={(e) => setAmount0(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="MOCK_USDC Amount"
                type="number"
                value={amount1}
                onChange={(e) => setAmount1(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleAddLiquidity}>
                Add Liquidity
            </Button>
        </Box>
    );
};

export default LiquidityComponent;
