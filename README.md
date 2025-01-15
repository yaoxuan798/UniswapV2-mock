# UniswapV2 Mock

## 项目简介

这是一个简化的 UniswapV2-inspired 单页应用（SPA），用于在两种代币 `MockERC20` 和 `MOCK_USDC` 之间进行交易和添加流动性。支持 MetaMask 和 WalletConnect 钱包集成，并部署在 GitHub Pages 上。

## 功能

- **钱包集成**：支持 MetaMask 和 WalletConnect。
- **交易功能**：在 `MockERC20` 和 `MOCK_USDC` 之间进行交易。
- **流动性管理**：为代币对添加/移除流动性。
- **交易历史**：显示当前钱包的交易历史。
- **余额显示**：显示连接钱包的代币余额。

## 设置和部署

### 智能合约

1. **安装依赖**

   ```bash
   yarn install