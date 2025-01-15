"use client"
import React, { useState, useContext } from "react";
import { Web3Context } from "@/app/context/Web3Context";
import { ethers } from "ethers";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Typography } from "@mui/material";
import { CONFIG } from "../config";
import { parseUnits } from "ethers";

const SwapComponent: React.FC = () => {
    const { signer, account } = useContext(Web3Context);
    const [amount, setAmount] = useState<string>("");
    const [fromToken, setFromToken] = useState<string>("MockERC20");

    const handleSwap = async () => {
        if (!signer) {
            alert("Please connect your wallet.");
            return;
        }

        const contractAddress = CONFIG.UNISWAP_V2_CONTRACT_ADDRESS;
        const abi = [
            "function swap(uint256 amountIn, bool swapToToken1) external",
        ];
        const contract = new ethers.Contract(contractAddress, abi, signer);

        try {
            const decimals = fromToken === "MockERC20" ? 18 : 6;
            const amountIn = parseUnits(amount, decimals);
            const swapToToken1 = fromToken === "MockERC20";
            const tx = await contract.swap(amountIn, swapToToken1);
            await tx.wait();
            alert("Swap successful");

            // 记录交易历史
            const txHash = tx.hash;
            const newTx = {
                hash: txHash,
                description: `Swapped ${amount} ${fromToken} to ${swapToToken1 ? "MOCK_USDC" : "MockERC20"}`,
                timestamp: Math.floor(Date.now() / 1000),
            };
            const existingTx = localStorage.getItem(`tx_${account}`);
            const txArray = existingTx ? JSON.parse(existingTx) : [];
            txArray.unshift(newTx);
            localStorage.setItem(`tx_${account}`, JSON.stringify(txArray));
        } catch (error) {
            console.error("Swap failed:", error);
            alert("Swap failed");
        }
    };

    return (
        <Box sx={{ marginY: 4 }}>
            <Typography variant="h5" gutterBottom>
                Swap Tokens
            </Typography>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel id="from-token-label">From</InputLabel>
                <Select
                    labelId="from-token-label"
                    value={fromToken}
                    label="From"
                    onChange={(e) => setFromToken(e.target.value)}
                >
                    <MenuItem value="MockERC20">MockERC20</MenuItem>
                    <MenuItem value="MOCK_USDC">MOCK_USDC</MenuItem>
                </Select>
            </FormControl>
            <TextField
                label="Amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleSwap}>
                Swap
            </Button>
        </Box>
    );
};

export default SwapComponent;