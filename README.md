# EE209AS

## Goals
* Implement identity management system for smart home sensors
* Enforce principle of least privilege for data access (sensors and actuators only access functions and data they need, users of the contract cannot access privileged information)
* Untrusted devices cannot add themselves to the network
* Robustness to protect system in case one of the sensors is compromised (Cloning attack)
* Future work may include research for private key storage and computations in secure hardware enclaves
* Limits DoS attacks on the network, since network transactions cost ether

## Attacker Model
* Possible physical access to some of the sensors/actuators
	* System not responsible for guaranteeing integrity of sensor/actuator function
* Can compromise software on some of the sensors/actuators
	* Damage is limited to compromised device; overall network is unaffected because of enforced privileges
* The private keys of the smart contract owner have not been compromised

## System Description
1. Contract maintains array of trusted IoT sensors and actuators
2. Contract enforces permissions for each device (contract functions check address of caller)
3. Devices added to blockchain as light nodes (Ethereum nodes hosted by third party) to reduce overhead
4. Sensors log readings into the blockchain at custom time interval according to power consumption limitations
5. Contract monitors readings makes relevant data available to actuators
6. Actuators accept input from contract at custom time interval according to power consumption limitations
