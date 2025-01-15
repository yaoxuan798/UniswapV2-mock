"use client"
import React, { useContext, useEffect, useState } from "react";
import { Web3Context } from "@/app/context/Web3Context";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

interface Transaction {
    hash: string;
    description: string;
    timestamp: number;
}

const HistoryComponent: React.FC = () => {
    const { account } = useContext(Web3Context);
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        if (account) {
            const storedTx = localStorage.getItem(`tx_${account}`);
            if (storedTx) {
                setTransactions(JSON.parse(storedTx));
            }
        }
    }, [account]);

    return (
        <Box sx={{ marginY: 4 }}>
            <Typography variant="h5" gutterBottom>
                Transaction History
            </Typography>
            {transactions.length === 0 ? (
                <Typography>No transactions found.</Typography>
            ) : (
                <List>
                    {transactions.map((tx) => (
                        <ListItem key={tx.hash}>
                            <ListItemText
                                primary={tx.description}
                                secondary={new Date(tx.timestamp * 1000).toLocaleString()}
                            />
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
};

export default HistoryComponent;
