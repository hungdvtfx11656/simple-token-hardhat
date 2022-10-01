const { ethers } = require("hardhat");
const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Token contract", function () {
  const deployTokenFixture = async () => {
    const Token = await ethers.getContractFactory("Token");
    const [owner, addr1, addr2] = await ethers.getSigners();

    const hardhatToken = await Token.deploy();

    await hardhatToken.deployed();

    return { Token, hardhatToken, owner, addr1, addr2 };
  };

  describe("deployment", function () {
    it("should set the right owner", async function () {
      const { hardhatToken, owner } = await loadFixture(deployTokenFixture);

      const contractOwner = await hardhatToken.owner();

      expect(contractOwner).to.equal(owner.address);
    });

    it("should assign the total supply to the owner", async function () {
      const { hardhatToken, owner } = await loadFixture(deployTokenFixture);

      const totalSupply = await hardhatToken.totalSupply();
      const ownerBalance = await hardhatToken.balanceOf(owner.address);

      expect(totalSupply).to.equal(ownerBalance);
    });
  });

  describe("transactions", function () {
    it("should transfer tokens between accounts", async function () {
      const { hardhatToken, owner, addr1, addr2 } = await loadFixture(deployTokenFixture);

      await expect(hardhatToken.transfer(addr1.address, 50)).to.changeTokenBalances(
        hardhatToken,
        [owner, addr1],
        [-50, 50]
      );

      await expect(hardhatToken.connect(addr1).transfer(addr2.address, 50)).to.changeTokenBalances(
        hardhatToken,
        [addr1, addr2],
        [-50, 50]
      );
    });

    it("should emit Transfer events", async function () {
      const { hardhatToken, owner, addr1, addr2 } = await loadFixture(deployTokenFixture);

      const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

      await expect(hardhatToken.connect(addr1).transfer(owner.address, 1)).to.be.revertedWith("Not enough tokens");

      expect(await hardhatToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);
    });
  });
});
