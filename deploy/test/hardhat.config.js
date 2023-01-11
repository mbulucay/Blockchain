require("@nomicfoundation/hardhat-toolbox");
const dotenv = require("dotenv");
dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: process.env.RPCURL,
      accounts: [process.env.PRIVATE_KEY] 
    },
  },
  Etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },
};
