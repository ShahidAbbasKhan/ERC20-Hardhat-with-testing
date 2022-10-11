
const hre = require("hardhat");

async function main() {
  const ERC20Mintable2 = await hre.ethers.getContractFactory("ERC20Mintable2");
  const Erc20 = await ERC20Mintable2.deploy();

  await Erc20.deployed();

  console.log(
    `Contract is deployed to address: ${Erc20.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
