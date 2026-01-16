// contracts/PublicLedger.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract PublicLedger {
    address public admin; // The person who deployed the contract

    struct Project {
        uint256 id;
        string title;
        uint256 budget;
        bool isVerified;
        bool exists;
    }

    mapping(uint256 => Project) public projects;

    // Only allow the admin to run certain functions
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender; // Set the deployer as the admin
    }

    function createProject(uint256 _id, string memory _title, uint256 _budget) public onlyAdmin {
        require(!projects[_id].exists, "Project already exists");
        projects[_id] = Project(_id, _title, _budget, false, true);
    }

    function verifyAndRelease(uint256 _id) public onlyAdmin {
        require(projects[_id].exists, "Project does not exist");
        require(!projects[_id].isVerified, "Already verified");
        projects[_id].isVerified = true;
    }
}