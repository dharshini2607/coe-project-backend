require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
    console.log(" Script started");

    // Replace with your deployed contract address
    const contractAddress = "0xf9ac2326a5d9359C1DAFBafd9b90de38EbEee2C0";  

    // Load ABI from artifacts
    const artifact = await ethers.getContractFactory("TwinProof");

    // Get deployer account
    const [deployer] = await ethers.getSigners();

    // Attach contract instance
    const twinProof = new ethers.Contract(contractAddress, artifact.interface, deployer);

    console.log(" Contract attached successfully at:", contractAddress);

    // 1️⃣ Register a model
    console.log("Registering model...");
    const tx = await contract.registerModel("ModelX", "0x4e03657aea45a94fc7d47ba826c8d667c0d1e6e33a64a036ec44f58fa12d6c45");
    await tx.wait();
    console.log("Model registered successfully!");

    await tx.wait();
    console.log(" Model registered!");

    // 2️⃣ Verify the model
    console.log("\n Verifying model...");
    const hash = ethers.keccak256(ethers.toUtf8Bytes("abc"));
    const details = await twinProof.verifyModel(hash);
    console.log(`name: ${details[0]}, hash: ${hash}, owner: ${details[1]}`);
}

main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error(" Error:", err);
        process.exit(1);
    });
