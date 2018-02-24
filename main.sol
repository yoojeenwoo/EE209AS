pragma solidity ^0.4.13;

contract System {
    uint constant MIN_TEMP = 15;        // Minimum temperature threshold
    uint constant MAX_TEMP = 30;        // Maximum temperature threshold
    uint constant MIN_HUM = 15;         // Minimum humidity threshold
    uint constant MAX_HUM = 30;         // Maximum humidity threshold
    uint[] temperature;                 // Dynamic temperature array
    uint[] humidity;                    // Dynamic humidity array
    
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
    event tempAlert(address from, address to, string message, uint temp);
    event humidAlert(address from, address to, string message, uint humid);
    
    function System() public {                                  // Constructor
        owner = msg.sender;                                     // Caller of contract is owner
    }
    
    function addSensor(address _device, string _name, string _deviceType) public {
        require(msg.sender == owner);                           // Only owner can add sensors
        
        sensors[_device].name = _name;
        sensors[_device].deviceType = _deviceType;
    }
    
    function addActuator(address _device, string _name, string _deviceType) public {
        require(msg.sender == owner);                           // Only owner can add sensors
        actuators[_device].name = _name;
        actuators[_device].deviceType = _deviceType;
    }
    
    function getTemp() public view returns(uint temp) {         // Getter function for temp
        return temperature[temperature.length];
    }
    
    function getHumid() public view returns(uint humid) {       // Getter function for humidity
        return humidity[humidity.length];
    }
    
    function safetyCheck() public view {
        /**@dev Checks if temperature and humidity are within bounds */
        if (msg.sender != owner) { return; }                    // Safety check accessible only by owner
        // uint currentTemp = temperature[temperature.length];
        // uint currentHumid = humidity[humidity.length];
        // if (currentTemp < MIN_TEMP) {
        //     emit tempAlert(msg.sender, ..., "Temperature too low!", currentTemp);
        // }
        // else if (currentTemp > MAX_TEMP) {
        //     emit tempAlert(msg.sender, ..., "Temperature too high!", currentTemp);
        // }
        // if (currentHumid < MIN_TEMP) {
        //     emit humidAlert(msg.sender, ..., "Humidity too low!", currentHumid);
        // }
        // else if (currentHumid > MAX_HUM) {
        //     emit humidAlert(msg.sender, ..., "Humidity too high!", currentHumid);
        // }
    }

}