# SIMPLE TOKEN

Fork of [Sample-Hardhat-Project](https://github.com/NomicFoundation/hardhat-boilerplate/). It comes with a simple Token contract, a test for that contract, a script that deploys that contract, and a minimal React front-end to interact with the contract using `ethers.js`.

## What's included

### Solidity contract & tests

The Hardhat project with the `Token` contract. It implements:

- There is a fixed total supply of tokens that can't be changed.
- The entire supply is assigned to the address that deploys the contract.
- Anyone can receive tokens.
- Anyone with at least one token can transfer tokens.
- The token is non-divisible. You can transfer 1, 2, 3 or 37 tokens but not 2.5.

### Frontend app

It's a separate npm project and it was created using `create-react-app`, so this means that it uses `webpack` and `babel`.

- Check the connected wallet's balance.
- Send tokens to an address.

### Frontend file architecture

- `components` : shared react components
- `contracts` : has the ABI and address of the contract
- `features` :
  - `network` : components with ETH network logic
  - `token` : components with Token contract logic
- `guards` : components with condition to guard access
- `utils` : utilities functions

## How to use it

### Deploy Token to Hardhat Network

After cloning the repository, install dependencies in the root directory:

```
npm install
```

Spin up an instance of Hardhat Network that you can connect to using MetaMask:

```
npx hardhat node
```

In a different terminal, run script to deploy Token:

```
npx hardhat --network localhost run scripts/deploy.js
```

### Start frontend app

In a different terminal, run:

```
cd frontend
npm install
npm start
```

Then open http://127.0.0.1:3000/ in your browser and connect with your account. What's happening here is that the frontend code to show the current wallet's balance is detecting that the balance is 0, so you wouldn't be able to try the transfer functionality

### Run Hardhat task

Run a custom Hardhat task that uses the balance of the deploying account to send **100 MST** and **1 ETH** to your address.

```
npx hardhat --network localhost faucet <your address>
```

This will allow you to send tokens to another address.
