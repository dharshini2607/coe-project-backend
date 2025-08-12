// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TwinProof {
    struct Model {
        string name;
        string version;
        address owner;
        uint256 timestamp;
    }

    mapping(string => Model) private models; 
    mapping(string => bool) private exists;  

    event ModelRegistered(string hash, string name, string version, address owner, uint256 timestamp);
    event OwnershipTransferred(string hash, address oldOwner, address newOwner);

    //new model
    function registerModel(string memory _hash, string memory _name, string memory _version) public {
        require(!exists[_hash], "Model already registered");

        models[_hash] = Model({
            name: _name,
            version: _version,
            owner: msg.sender,
            timestamp: block.timestamp
        });
        exists[_hash] = true;

        emit ModelRegistered(_hash, _name, _version, msg.sender, block.timestamp);
    }

    //verify
    function verifyModel(string memory _hash) public view returns (string memory, string memory, address, uint256) {
        require(exists[_hash], "Model not found");
        Model memory m = models[_hash];
        return (m.name, m.version, m.owner, m.timestamp);
    }

    //transfer
    function transferOwnership(string memory _hash, address _newOwner) public {
        require(exists[_hash], "Model not found");
        require(models[_hash].owner == msg.sender, "Only owner can transfer");

        address oldOwner = models[_hash].owner;
        models[_hash].owner = _newOwner;

        emit OwnershipTransferred(_hash, oldOwner, _newOwner);
    }
}
