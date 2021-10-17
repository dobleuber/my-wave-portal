const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther('0.1'),
    });
    await waveContract.deployed();

    console.log("Deployed WavePortal contract to:", waveContract.address);
    console.log("Owner:", owner.address);

    /*
    * Get Contract balance
    */
    let contractBalance = await hre.ethers.provider.getBalance(
        waveContract.address
    );
    console.log(
        'Contract balance:',
        hre.ethers.utils.formatEther(contractBalance)
    );

    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    console.log("WaveCount:", waveCount);

    let waveTxn = await waveContract.wave('The first message!');
    await waveTxn.wait();

    waveTxn = await waveContract.wave('Another message');
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(randomPerson).wave('hey I am new here!');
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();

    waveCount = await waveContract.getUserWaves(owner.address);

    waveCount = await waveContract.getUserWaves(randomPerson.address);

    const allWaves = await waveContract.getWaves();
    console.log("All Waves:", allWaves);

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
        'Contract balance:',
        hre.ethers.utils.formatEther(contractBalance)
    );
}

main().then(() => {
    console.log("Done");
    process.exit(0);
}).catch((error) => {
    console.error(error);
    process.exit(1);
});