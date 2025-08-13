const { ethers } = require("hardhat");

async function main() {
  const Twin = await ethers.getContractFactory("Twin"); // Your contract name
  const twin = await Twin.deploy();

  await twin.deployed();
  console.log(`Twin deployed to: ${twin.address}`);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
