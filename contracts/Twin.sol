// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TwinProof {
    struct Model {
        string name;
        string version;
        address owner;
        uint256 timestamp;
        uint256 royaltyPercentage; // Percentage (0-100)
    }

    mapping(bytes32 => Model) public models;
    mapping(bytes32 => bool) public exists;

    event ModelRegistered(
        bytes32 indexed hash,
        string name,
        string version,
        address indexed owner,
        uint256 royaltyPercentage,
        uint256 timestamp
    );

    event OwnershipTransferred(
        bytes32 indexed hash,
        address indexed oldOwner,
        address indexed newOwner
    );

    // Register a new model
    function registerModel(
        bytes32 _hash,
        string memory _name,
        string memory _version,
        uint256 _royaltyPercentage
    ) public {
        require(!exists[_hash], "Model already registered");
        require(_royaltyPercentage <= 100, "Royalty too high");

        models[_hash] = Model({
            name: _name,
            version: _version,
            owner: msg.sender,
            timestamp: block.timestamp,
            royaltyPercentage: _royaltyPercentage
        });

        exists[_hash] = true;

        emit ModelRegistered(
            _hash,
            _name,
            _version,
            msg.sender,
            _royaltyPercentage,
            block.timestamp
        );
    }

    // Verify model info
    function verifyModel(bytes32 _hash)
        public
        view
        returns (
            string memory,
            string memory,
            address,
            uint256,
            uint256
        )
    {
        require(exists[_hash], "Model not found");
        Model memory m = models[_hash];
        return (m.name, m.version, m.owner, m.timestamp, m.royaltyPercentage);
    }

    // Transfer ownership
    function transferOwnership(bytes32 _hash, address _newOwner) public {
        require(exists[_hash], "Model not found");
        require(models[_hash].owner == msg.sender, "Only owner can transfer");

        address oldOwner = models[_hash].owner;
        models[_hash].owner = _newOwner;

        emit OwnershipTransferred(_hash, oldOwner, _newOwner);
    }
}


