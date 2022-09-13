const { network } = require("hardhat")
// const { networkConfig, developmentChains } = require("../helper-hardhat-config")

module.exports = async (hre) => {

    const {getNamedAccounts, deployments} = hre
    const {deploy, log} = deployments
    const {deployer} = await getNamedAccounts()

    // const chainId = network.config.chainId

    const registry = await deploy("Registry", {
        from: deployer,
        args: [], // Put price feed address
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    
    log("-------------------------------------------------------------------")

}