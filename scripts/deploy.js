const main = async () => {
    const [deployer] = await ethers.getSigners();
    const accountBalance = await deployer.getBalance();

    console.log(`Deployer account balance: ${accountBalance}`);
    console.log(`Deployer account address: ${deployer.address}`);

    const Token = await ethers.getContractFactory("WavePortal");
    const portal = await Token.deploy();
    await portal.deployed();

    console.log(`Deployed contract address: ${portal.address}`);
}

const run = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

main();