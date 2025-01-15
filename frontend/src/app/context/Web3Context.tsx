"use client"
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { BrowserProvider, JsonRpcSigner } from "ethers";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { CONFIG } from "../config";

interface Web3ContextProps {
    provider: BrowserProvider | null;
    signer: JsonRpcSigner | null;
    account: string | null;
    connectMetaMask: () => void;
    connectWalletConnect: () => void;
    disconnect: () => void;
}

export const Web3Context = createContext<Web3ContextProps>({
    provider: null,
    signer: null,
    account: null,
    connectMetaMask: () => {},
    connectWalletConnect: () => {},
    disconnect: () => {},
});

const injected = new InjectedConnector({ supportedChainIds: [5] }); // Goerli chainId is 5
const walletConnect = new WalletConnectConnector({
    rpc: { 5: `https://goerli.infura.io/v3/${CONFIG.INFURA_PROJECT_ID}` },
    qrcode: true,
});

interface Web3ProviderProps {
    children: ReactNode;
}

export const Web3ProviderContext: React.FC<Web3ProviderProps> = ({ children }) => {
    const [provider, setProvider] = useState<BrowserProvider | null>(null);
    const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
    const [account, setAccount] = useState<string | null>(null);

    const connectMetaMask = async () => {
        try {
            await injected.activate();
            const newProvider = new BrowserProvider((window as any).ethereum);
            const newSigner = await newProvider.getSigner();
            const address = await newSigner.getAddress();
            setProvider(newProvider);
            setSigner(newSigner);
            setAccount(address);
        } catch (error) {
            console.error("MetaMask connection failed:", error);
        }
    };

    const connectWalletConnectHandler = async () => {
        try {
            await walletConnect.activate();
            const wcProvider = await walletConnect.getProvider();
            const newProvider = new BrowserProvider(wcProvider);
            const newSigner = await newProvider.getSigner();
            const address = await newSigner.getAddress();
            setProvider(newProvider);
            setSigner(newSigner);
            setAccount(address);
        } catch (error) {
            console.error("WalletConnect connection failed:", error);
        }
    };

    const disconnect = async () => {
        try {
            await injected.deactivate();
            await walletConnect.deactivate();
            setProvider(null);
            setSigner(null);
            setAccount(null);
        } catch (error) {
            console.error("Disconnect failed:", error);
        }
    };

    useEffect(() => {
        // Optionally, implement auto-connect logic here
    }, []);

    return (
        <Web3Context.Provider
            value={{
                provider,
                signer,
                account,
                connectMetaMask,
                connectWalletConnect: connectWalletConnectHandler,
                disconnect,
            }}
        >
            {children}
        </Web3Context.Provider>
    );
};
