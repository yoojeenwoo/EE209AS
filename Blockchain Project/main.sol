pragma solidity ^0.4.13;

contract System {
	bytes public firmware;							// Newest Manufacturer Firmware Binary
    address public owner;               			// Address of contract owner
    
    struct Node {                     				// Instantiation of IOT sensor
        string name;                    			// Device Name
    }
    
    mapping(address => Node) public nodes;                  // Map addresses to devices
    
    // Alert events logged to blockchain
    // event updateSucceed(address from, string message, uint temp);
    // event updateFail(address from, string message, uint humid);
    
    // Functions to set up network and devices
    function System() public {                                  // Constructor
        owner = msg.sender;                                     // Caller of contract is owner
    }
    
	function pushUpdate(bytes new_firmware) public {
		require(msg.sender == owner);
		firmware = new_firmware;
	}
	
	function checkForUpdate(bytes myFirmware) public view returns(bool updateRequired) {
	    if (myFirmware.length != firmware.length) {
	        return true;
	    }
	    for (uint i = 0; i < myFirmware.length && i < firmware.length; ++i) {
	        if (firmware[i] != myFirmware[i]) {
	            return true;
	        }
	    }
	    return false;
	}
	
    function addNode(address _device, string _name) public {
        require(msg.sender == owner);
        nodes[_device].name = _name;
    }
    
    function removeNode(address _device) public {
        require(msg.sender == owner);
        delete nodes[_device];
    }
    
    // Clean-up Functions
    function kill() public {
        require(msg.sender == owner);
        selfdestruct(owner);
    }

}