pragma solidity ^0.4.13;

contract System {
	bytes1 constant WRITE_TEMP_PERMISSION = 0x01;	// Permissions to call addTemp()
	bytes1 constant READ_TEMP_PERMISSION = 0x02;	// Permissions to call getTemp()
	bytes1 constant WRITE_HUMID_PERMISSION = 0x04;	// Permissions to call addHumid()
	bytes1 constant READ_HUMID_PERMISSION = 0x08;	// Permissions to call getHumid()
    address[] devices;                  			// Dynamic device array
    
    address public owner;               			// Address of contract owner
    
    struct Sensor {                     			// Instantiation of IOT sensor
        string name;                    			// Device Name
        bytes1 permissions;	            			// Device Permissions
    }
    
    
    struct Actuator {                   			// Instantiation of IOT actuator
        string name;                    			// Device Name
        bytes1 permissions;               			// Device Permissions
    }
    
    mapping(address => Sensor) public sensors;                  // Map addresses to devices
    mapping(address => Actuator) public actuators;              // Map addresses to actuators
    
    // Alert events logged to blockchain
    // event tempAlert(address from, string message, uint temp);
    // event humidAlert(address from, string message, uint humid);
    // event tempUpdate(address from, uint temp);
    // event humidUpdate(address from, uint temp);
    
    // Functions to set up network and devices
    function System() public {                                  // Constructor
        owner = msg.sender;                                     // Caller of contract is owner
    }
    
    function addSensor(address _device, string _name, bytes1 _permissions) public {
        require(msg.sender == owner);                           // Only owner can add sensors
        sensors[_device].name = _name;
        sensors[_device].permissions = _permissions;
        devices.push(_device);
    }
    
    function addActuator(address _device, string _name, bytes1 _permissions) public {
        require(msg.sender == owner);                           // Only owner can add sensors
        actuators[_device].name = _name;
        actuators[_device].permissions = _permissions;
        devices.push(_device);
    }
    
    // Clean-up Functions
    function kill() public {
        require(msg.sender == owner);
        selfdestruct(owner);
    }

}