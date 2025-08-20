// scripts/interact.js
const { ethers } = require("hardhat");

async function main() {
    //  Replace this with your deployed contract address
    const contractAddress = "0xf9ac2326a5d9359C1DAFBafd9b90de38EbEee2C0";

    // Load contract
    const TwinProof = await ethers.getContractFactory("TwinProof");
    const twinProof = TwinProof.attach(contractAddress);

    // Generate a hash for the model file
    const hash = ethers.keccak256(ethers.toUtf8Bytes("MyModelFile"));

    // ----------------------------
    // 1. Register a model
    // ----------------------------
    console.log(" Registering model...");
    const tx = await twinProof.registerModel(hash, "MyModel", "v1.0", 10);
    await tx.wait();
    console.log(" Model registered!");

    // ----------------------------
    // 2. Verify the model
    // ----------------------------
    console.log(" Verifying model...");
    const [name, version, owner, timestamp, royalty] = await twinProof.verifyModel(hash);

    console.log(` name: ${name}`);
    console.log(` version: ${version}`);
    console.log(` owner: ${owner}`);
    console.log(` timestamp: ${timestamp.toString()}`);
    console.log(` royalty: ${royalty}`);

    // ----------------------------
    // 3. (Optional) Transfer ownership
    // ----------------------------
    // const newOwner = "0xYourNewOwnerAddress";
    // const tx2 = await twinProof.transferOwnership(hash, newOwner);
    // await tx2.wait();
    // console.log(" Ownership transferred!");
}

main().catch((error) => {
    console.error(" Error:", error);
    process.exitCode = 1;
});
