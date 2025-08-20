async function main() {
    console.log(" Script started");

    const { ethers } = require("hardhat");
    const contractAddress = "0xYourDeployedContract"; // replace

    console.log("Using contract address:", contractAddress);

    const TwinProof = await ethers.getContractFactory("TwinProof");
    const twinProof = TwinProof.attach(contractAddress);

    console.log(" Contract attached successfully!");
}

main().catch((error) => {
    console.error(" Error:", error);
    process.exitCode = 1;
});

