import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const MockERC20 = await ethers.getContractFactory("MockERC20");
    const mockERC20 = await MockERC20.deploy(ethers.utils.parseUnits("1000000", 18));
    await mockERC20.deployed();
    console.log("MockERC20 deployed to:", mockERC20.address);

    const MOCK_USDC = await ethers.getContractFactory("MOCK_USDC");
    const mockUSDC = await MOCK_USDC.deploy(ethers.utils.parseUnits("1000000", 6));
    await mockUSDC.deployed();
    console.log("MOCK_USDC deployed to:", mockUSDC.address);

    const UniswapV2Mock = await ethers.getContractFactory("UniswapV2Mock");
    const uniswapV2Mock = await UniswapV2Mock.deploy(mockERC20.address, mockUSDC.address);
    await uniswapV2Mock.deployed();
    console.log("UniswapV2Mock deployed to:", uniswapV2Mock.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
