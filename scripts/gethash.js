// scripts/getHash.js
const { ethers } = require("hardhat");

async function main() {
    const fileName = "MyModelFile"; // put your file name here
    const hash = ethers.keccak256(ethers.toUtf8Bytes(fileName));
    console.log(`Hash for "${fileName}": ${hash}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});