import "@nomiclabs/hardhat-waffle";
import _ from "@nomiclabs/hardhat-ethers";

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.10",
  networks:{
    hardhat: {
      chainId: 1337
    }
  }
};
