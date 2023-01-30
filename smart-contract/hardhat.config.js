require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: '0.8.0',
  networks: {
    goerli: {
      url: 'https://eth-goerli.alchemyapi.io/v2/wMWLxSrAx8u-04aT7zXL8Cn2fcxs2ruy',
      accounts: ['bfca55c380cdd8dd6f92ee30e0c24565e57d6ecd8f7c9c62518f0e7e997d5d29'],
    },
  },
};