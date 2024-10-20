// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

contract PatientRecord{
    mapping(address => bool) public owners;

    // Event to track addition of new owners
    event OwnerAdded(address indexed newOwner);

    // Event to track removal of an owner
    event OwnerRemoved(address indexed removedOwner);

    // Modifier to check if the caller is a valid owner
    modifier onlyOwners() {
        require(owners[msg.sender], "Caller is not an authorized owner");
        _;
    }

    // Constructor to initialize with a set of owners
    constructor(address[] memory _owners) {
        for (uint256 i = 0; i < _owners.length; i++) {
            owners[_owners[i]] = true;
        }
    }

    function addOwner(address _newOwner) public onlyOwners {
        require(_newOwner != address(0), "Invalid address");
        require(!owners[_newOwner], "Address is already an owner");
        
        // Add new owner
        owners[_newOwner] = true;
        emit OwnerAdded(_newOwner);
    }

    // Function to remove an existing owner (only callable by existing owners)
    function removeOwner(address _owner) public onlyOwners {
        require(owners[_owner], "Address is not an owner");

        // Remove owner
        owners[_owner] = false;
        emit OwnerRemoved(_owner);
    }

    struct Patient {
        string CID;           // Unique CID (Content Identifier)
        uint256 timeStamp;    // Timestamp when the data is uploaded
    }

    // Mapping from patientID to Patient details
    mapping(string => Patient[]) private patientRecords;

    // Event to emit when a new patient record is added
    // Using keccak256 to hash strings and index them as bytes32
    event PatientRecordAdded(bytes32 indexed hashedPatientID,string patientId, bytes32 indexed hashedCID,string CID, uint256 timeStamp);

    function addPatientRecord(string calldata patientId, string calldata cid, uint256 timeStamp) external onlyOwners{
        // Create a new Patient object
        require(bytes(patientId).length > 0, "Invalid patientId: must not be empty");
        require(bytes(cid).length > 0, "Invalid cid: must not be empty");
        Patient memory newPatient = Patient({
            CID: cid,
            timeStamp: timeStamp
        });

        // Add the new Patient object to the array for the given patientId
        patientRecords[patientId].push(newPatient);

         // Hash the patientId and CID
        bytes32 hashedPatientID = keccak256(abi.encodePacked(patientId));
        bytes32 hashedCID = keccak256(abi.encodePacked(cid));

        // Emit the PatientRecordAdded event
        emit PatientRecordAdded(hashedPatientID,patientId, hashedCID,cid, timeStamp);
    }

    function getPatientRecords(string calldata patientId) external view onlyOwners returns (Patient[] memory) {
        require(bytes(patientId).length > 0, "Invalid patientId: must not be empty");
        return patientRecords[patientId];
    }

}