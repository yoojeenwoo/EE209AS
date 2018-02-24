pragma solidity ^0.4.13;

contract System {
    uint constant MAX_TEMP = 30;        // Maximum temperature threshold
    uint constant MAX_HUM = 30;         // Maximum humidity threshold
    uint[] temperature;                 // Dynamic temperature array
    uint[] humidity;                    // Dynamic humidity array
    
    struct Device {
        string name; // Give device a name
        uint deviceType;
    }
    
    function getTemp() public view returns(uint temp) {
        return temperature[temperature.length];
    }
    function getHumid() public view returns(uint humid) {
        return humidity[humidity.length];
    }
    
    address public owner;
    
    mapping(address => Device) public devices;
    
    function safetyCheck() public view {
        if (temperature[temperature.length] > MAX_TEMP) {
            
        }
        else if (humidity[humidity.length] > MAX_HUM) {
            
        }
    }

}