pragma solidity ^0.4.13;

contract System {
    uint constant MIN_TEMP = 15;        			// Minimum temperature threshold
    uint constant MAX_TEMP = 30;        			// Maximum temperature threshold
    uint constant MIN_HUM = 15;         			// Minimum humidity threshold
    uint constant MAX_HUM = 30;         			// Maximum humidity threshold
	bytes1 constant WRITE_TEMP_PERMISSION = 0x01;	// Permissions to call addTemp()
	bytes1 constant READ_TEMP_PERMISSION = 0x02;	// Permissions to call getTemp()
	bytes1 constant WRITE_HUMID_PERMISSION = 0x04;	// Permissions to call addHumid()
	bytes1 constant READ_HUMID_PERMISSION = 0x08;	// Permissions to call getHumid()
	bytes1 constant LOW_TEMP_ALERT = 0x01;			// Low Temperature Alert Code
	bytes1 constant HIGH_TEMP_ALERT = 0x02;			// High Temperature Alert Code
	bytes1 constant LOW_HUMID_ALERT = 0x04;			// Low Humidity Alert Code
	bytes1 constant HIGH_HUMID_ALERT = 0x08;		// High Humidity Alert Code
    uint[] temperature;                 			// Dynamic temperature array
    uint[] humidity;                    			// Dynamic humidity array
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
    event tempAlert(address from, string message, uint temp);
    event humidAlert(address from, string message, uint humid);
    event tempUpdate(address from, uint temp);
    event humidUpdate(address from, uint temp);
    
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
    
    // Getter functions
    function getTemp() public view returns(uint temp) {
		require(msg.sender == owner || (actuators[msg.sender].permissions & READ_TEMP_PERMISSION) == READ_TEMP_PERMISSION);
        return temperature[temperature.length - 1];
    }
    
    function getHumid() public view returns(uint humid) {
		require(msg.sender == owner || (actuators[msg.sender].permissions & READ_HUMID_PERMISSION) == READ_HUMID_PERMISSION);
        return humidity[humidity.length - 1];
    }
    
    // Setter Functions
    function addTemp(uint temp) public {
		require((sensors[msg.sender].permissions & WRITE_TEMP_PERMISSION) == WRITE_TEMP_PERMISSION);
        temperature.push(temp);
        emit tempUpdate(msg.sender, temp);
    }
    
    function addHumid(uint humid) public {
		require((sensors[msg.sender].permissions & WRITE_HUMID_PERMISSION) == WRITE_HUMID_PERMISSION);
        humidity.push(humid);
        emit humidUpdate(msg.sender, humid);
    }
    
    // Implementation Functions
    function safetyCheck() public returns(bytes1 alert_code){
        // @dev Checks if temperature and humidity are within bounds
		// @return alert_code
        if (msg.sender != owner) { return; }                    // Safety check accessible only by owner
        uint currentTemp = getTemp();
        uint currentHumid = getHumid();
		alert_code = 0x0; 
        if (currentTemp < MIN_TEMP) {
            emit tempAlert(msg.sender, "Temperature too low!", currentTemp);
			alert_code = LOW_TEMP_ALERT;
        }
        else if (currentTemp > MAX_TEMP) {
            emit tempAlert(msg.sender, "Temperature too high!", currentTemp);
			alert_code = HIGH_TEMP_ALERT;
        }
        if (currentHumid < MIN_TEMP) {
            emit humidAlert(msg.sender, "Humidity too low!", currentHumid);
			alert_code = LOW_HUMID_ALERT;
        }
        else if (currentHumid > MAX_HUM) {
            emit humidAlert(msg.sender, "Humidity too high!", currentHumid);
			alert_code = HIGH_HUMID_ALERT;
        }
		return alert_code;
    }
    
    // Clean-up Functions
    function kill() public {
        require(msg.sender == owner);
        selfdestruct(owner);
    }

}