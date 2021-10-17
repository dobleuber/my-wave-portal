require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    kovan: {
      url: 'https://eth-kovan.alchemyapi.io/v2/EGSRv-F_7MgP9w8eW_IByI-7Rni_yYap',
      accounts: [
        '576fc48a04d114ad4fd791fc57a4956bfd18c93f25ed932c3092a5a9102a8eb1'
      ]
    },
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/EGSRv-F_7MgP9w8eW_IByI-7Rni_yYap',
      accounts: [
        '576fc48a04d114ad4fd791fc57a4956bfd18c93f25ed932c3092a5a9102a8eb1'
      ]
    }
  }
};
