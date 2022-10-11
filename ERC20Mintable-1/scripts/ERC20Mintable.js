
const hre = require("hardhat");

async function main() {
  const ERC20Mintable = await hre.ethers.getContractFactory("ERC20Mintable");
  const Erc20 = await ERC20Mintable.deploy();

  await Erc20.deployed();

  console.log(
    `Contract is deployed to address: ${Erc20.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
