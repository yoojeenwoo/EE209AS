pragma solidity ^0.4.13;

contract System {
    uint constant MIN_TEMP = 15;        // Minimum temperature threshold
    uint constant MAX_TEMP = 30;        // Maximum temperature threshold
    uint constant MIN_HUM = 15;         // Minimum humidity threshold
    uint constant MAX_HUM = 30;         // Maximum humidity threshold
    uint[] temperature;                 // Dynamic temperature array
    uint[] humidity;                    // Dynamic humidity array
    address[] devices;                  // Dynamic device array
    
    address public owner;               // Address of contract owner
    
    struct Sensor {                     // Instantiation of IOT sensor
        string name;                    // Device Name
        string deviceType;              // Device Type
    }
    
    
    struct Actuator {                   // Instantiation of IOT actuator
        string name;                    // Device Name
        string deviceType;              // Device Type
    }
    
    mapping(address => Sensor) public sensors;                  // Map addresses to devices
    mapping(address => Actuator) public actuators;              // Map addresses to actuators
    
    // Alert events emitted to light clients
    event tempAlert(address from, string message, uint temp);
    event humidAlert(address from, string message, uint humid);
    event tempUpdate(address from, uint temp);
    event humidUpdate(address from, uint temp);
    
    // Functions to set up network and devices
    function System() public {                                  // Constructor
        owner = msg.sender;                                     // Caller of contract is owner
    }
    
    function addSensor(address _device, string _name, string _deviceType) public {
        require(msg.sender == owner);                           // Only owner can add sensors
        sensors[_device].name = _name;
        sensors[_device].deviceType = _deviceType;
        devices.push(_device);
    }
    
    function addActuator(address _device, string _name, string _deviceType) public {
        require(msg.sender == owner);                           // Only owner can add sensors
        actuators[_device].name = _name;
        actuators[_device].deviceType = _deviceType;
        devices.push(_device);
    }
    
    // Getter functions
    function getTemp() public view returns(uint temp) {
        return temperature[temperature.length - 1];
    }
    
    function getHumid() public view returns(uint humid) {
        return humidity[humidity.length - 1];
    }
    
    // Setter Functions
    function addTemp(uint temp) public {
        temperature.push(temp);
        tempUpdate(msg.sender, temp);
    }
    
    function addHumid(uint humid) public {
        humidity.push(humid);
        humidUpdate(msg.sender, humid);
    }
    
    // Implementation Functions
    function safetyCheck() public {
        /**@dev Checks if temperature and humidity are within bounds */
        if (msg.sender != owner) { return; }                    // Safety check accessible only by owner
        uint currentTemp = temperature[temperature.length - 1];
        uint currentHumid = humidity[humidity.length - 1];
        if (currentTemp < MIN_TEMP) {
            emit tempAlert(msg.sender, "Temperature too low!", currentTemp);
        }
        else if (currentTemp > MAX_TEMP) {
            emit tempAlert(msg.sender, "Temperature too high!", currentTemp);
        }
        if (currentHumid < MIN_TEMP) {
            emit humidAlert(msg.sender, "Humidity too low!", currentHumid);
        }
        else if (currentHumid > MAX_HUM) {
            emit humidAlert(msg.sender, "Humidity too high!", currentHumid);
        }
    }
    
    // Clean-up Functions
    function kill() public {
        require(msg.sender == owner);
        selfdestruct(owner);
    }

}