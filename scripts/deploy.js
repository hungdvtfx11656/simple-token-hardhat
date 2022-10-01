const { ethers } = require("hardhat");
const path = require("path");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log(`deploying contract with account: ${deployer}`);
  console.log(`account balance: ${(await deployer.getBalance()).toString()}`);

  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy();
  await token.deployed();

  console.log(`contract address: ${token.address}`);

  saveFrontendFiles(token);
}

function saveFrontendFiles(token) {
  const fs = require("fs");
  const contractsDir = path.join(__dirname, "..", "frontend", "src", "contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify({ Token: token.address }, undefined, 2)
  );

  const TokenArtifact = artifacts.readArtifactSync("Token");

  fs.writeFileSync(path.join(contractsDir, "Token.json"), JSON.stringify(TokenArtifact, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
