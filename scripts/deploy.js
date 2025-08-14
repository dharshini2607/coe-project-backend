const { ethers } = require("hardhat");

async function main() {
  console.log(" Running deploy.js from:", __filename);

  const TwinProof = await ethers.getContractFactory("TwinProof");
  const twinProof = await TwinProof.deploy();

  // Wait for the contract to be mined
  await twinProof.waitForDeployment();

  console.log(`TwinProof deployed to: ${twinProof.target}`);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(" Deployment failed:", error);
    process.exit(1);
  });

