// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    mapping(address => uint256) userWaves;

    mapping(address => uint256) lastWavedAt;

    /*
     * We will be using this below to help generate a random number
     */
    uint256 private seed;

    event NewWave(address indexed from, uint256 timestamp, string message);

    struct Wave {
        address waver;
        uint256 timestamp;
        string message;
    }

    Wave[] waves;

    constructor() payable {
        console.log("Hi, this is me! I am a Smart Contract!");
    }

    function wave(string memory _message) public {
        require(lastWavedAt[msg.sender] + 15 minutes < block.timestamp, "You should wait 15 minutes.");

        lastWavedAt[msg.sender] = block.timestamp;
        
        totalWaves += 1;
        console.log("%s says %s", msg.sender, _message);
        userWaves[msg.sender] += 1;

        waves.push(Wave({
            waver: msg.sender,
            timestamp: block.timestamp,
            message: _message
        }));

        /*
         * Generate a Psuedo random number between 0 and 100
         */
        uint256 randomNumber = (block.difficulty + block.timestamp + seed) % 100;
        console.log("Random # generated: %s", randomNumber);

        seed = randomNumber;

        if (randomNumber < 50) {
            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }

        emit NewWave(msg.sender, block.timestamp, _message);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("Total waves: %s", totalWaves);
        return totalWaves;
    }

    function getUserWaves(address user) public view returns (uint256) {
        console.log("%s has %s waves", user, userWaves[user]);
        return userWaves[user];
    }

    function getWaves() public view returns (Wave[] memory) {
        return waves;
    }
}