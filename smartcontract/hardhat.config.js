require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "hardhat",
  namedAccounts: {
    deployer: {
      default: 0
    }
  },
  settings: {
    optimizer: {
      runs: 200, 
      enabled: true,
      details: {
        yul: false,
      },
    }
  }
};
