const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();

    console.log("Deployed WavePortal contract to:", waveContract.address);
    console.log("Owner:", owner.address);

    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    console.log("WaveCount:", waveCount);

    let waveTxn = await waveContract.wave();
    await waveTxn.wait();

    waveTxn = await waveContract.wave();
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(randomPerson).wave();
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();

    waveCount = await waveContract.getUserWaves(owner.address);

    waveCount = await waveContract.getUserWaves(randomPerson.address);
}

main().then(() => {
    console.log("Done");
    process.exit(0);
}).catch((error) => {
    console.error(error);
    process.exit(1);
});