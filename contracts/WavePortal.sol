pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    mapping(address => uint256) userWaves;

    event NewWave(address indexed from, uint256 timestamp, string message);

    struct Wave {
        address waver;
        uint256 timestamp;
        string message;
    }

    Wave[] waves;

    constructor() {
        console.log("Hi, this is me! I am a Smart Contract!");
    }

    function wave(string memory _message) public {
        totalWaves += 1;
        console.log("%s says hi!", msg.sender);
        userWaves[msg.sender] += 1;

        waves.push(Wave({
            waver: msg.sender,
            timestamp: block.timestamp,
            message: _message
        }));

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