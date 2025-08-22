// scripts/checkModel.js
const { ethers } = require("hardhat");

async function main() {
    // Replace with your deployed contract address
    const contractAddress = "0xf9ac2326a5d9359C1DAFBafd9b90de38EbEee2C0";

    // Your model hash (from getHash.js or saved)
    const modelHash = "0xbbf58e11ec2d394e2a49e596b5e7c3119e7a2cc1762967400840610f53b6964e";

    // Load contract
    const TwinProof = await ethers.getContractFactory("TwinProof");
    const twinProof = TwinProof.attach(contractAddress);

    console.log(" Checking model on chain...");
    const [name, version, owner, timestamp, royalty] = await twinProof.verifyModel(modelHash);

    console.log(" Model Found!");
    console.log(`Hash: ${modelHash}`);
    console.log(`Name: ${name}`);
    console.log(`Version: ${version}`);
    console.log(`Owner: ${owner}`);
    console.log(`Timestamp: ${timestamp.toString()}`);
    console.log(`Royalty: ${royalty}`);
}

main().catch((error) => {
    console.error(" Error:", error);
    process.exitCode = 1;
});

