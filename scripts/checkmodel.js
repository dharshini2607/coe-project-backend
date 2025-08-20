// scripts/checkModel.js
const { ethers } = require("hardhat");

async function main() {
    const contractAddress = "0xf9ac2326a5d9359C1DAFBafd9b90de38EbEee2C0";

    const TwinProof = await ethers.getContractFactory("TwinProof");
    const twinProof = TwinProof.attach(contractAddress);

    // Use the same hash you registered with
    const hash = ethers.keccak256(ethers.toUtf8Bytes("MyModelFile"));

    console.log(" Checking registered model...");
    const [name, version, owner, timestamp, royalty] = await twinProof.verifyModel(hash);

    console.log(` Model found!`);
    console.log(` name: ${name}`);
    console.log(` version: ${version}`);
    console.log(` owner: ${owner}`);
    console.log(` timestamp: ${timestamp.toString()}`);
    console.log(` royalty: ${royalty}`);
}

main().catch((error) => {
    console.error(" Error:", error);
    process.exitCode = 1;
});
