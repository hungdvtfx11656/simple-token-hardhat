const fs = require("fs");
const { task } = require("hardhat/config");

task("faucet", "Sends ETH and tokens to an address")
  .addPositionalParam("receiver", "The address that will receive them")
  .setAction(async ({ receiver }, { ether }) => {
    const addressesFile = __dirname + "/../frontend/src/contracts/contract-address.json";

    if (!fs.existsSync(addressesFile)) {
      console.error("You need to deploy your contract first.");
      return;
    }

    const addressJson = fs.readFileSync(addressesFile);
    const address = JSON.parse(addressJson);

    if ((await ethers.provider.getCode(address.Token)) === "0x") {
      console.error("You need to deploy your conreact first.");
      return;
    }

    const token = await ethers.getContractAt("Token", address.Token);
    const [sender] = await ethers.getSigners();

    const tx = await token.transfer(receiver, 100);
    await tx.wait();

    const tx2 = await sender.sendTransaction({
      to: receiver,
      value: ethers.constants.WeiPerEther,
    });
    await tx2.wait();

    console.log(`Transferred 1 ETH and 100 tokens to ${receiver}`);
  });
