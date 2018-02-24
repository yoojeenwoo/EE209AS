# EE209AS

## Goals
* Implement identity management system for smart home sensors
* Enforce principle of least privilege for data access (sensors and actuators only access functions and data they need, users of the contract cannot access privileged information)
* Untrusted devices cannot add themselves to the network
* Robustness to protect system in case one of the sensors is compromised (?)

## System Description
1. Contract maintains array of trusted IoT sensors and actuators
2. Sensors log readings into the blockchain
3. Contract monitors readings and sends output to actuators accordingly
