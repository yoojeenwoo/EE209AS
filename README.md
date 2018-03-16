# EE209AS

## Goals
* Implement identity management and permissions system for smart home sensors
* Enforce principle of least privilege for data access (sensors and actuators only access functions and data they need, users of the contract cannot access privileged information)
* Untrusted devices cannot add themselves to the network
* Robustness to protect system in case one of the sensors is compromised (Cloning attack, faked sensor readings)
* Limits DoS attacks on the network, since network transactions cost ether (are untrusted entities capable of obtaining our private ether?)
* Transparent and tamper-proof smart contract code

## Attacker Model
* Assumes no physical access to sensors/actuators
	* System cannot protect sensor data if a sensor is physically compromised
* Can compromise software on some of the sensors/actuators
	* Damage is limited to compromised device; overall network is unaffected because of enforced privileges
* The private keys of the smart contract owner have not been compromised

## System Description
1. Contract maintains array of trusted IoT sensors and actuators
2. Contract enforces permissions for each device (contract functions check address of caller)
3. Devices added to blockchain (how are devices added? how do we know an added device is trusted?)
4. Contract enforces permissions for users attempting to access devices

## Ideas
* Cryptographic hash of firmware stored on blockchain to verify genuine devices [1]
* Permissions stored on blockchain for user access control
* Secure messaging between devices
	* Transactions are signed and verified cryptographically to ensure sender is trusted

## References
1. N. Kshreti, "Can Blockchain Strengthen the Internet of Things?," _IT Professional_, Vol. 19, No. 4, August 2017
2. S. Huh, S. Cho, and S. Kim, "Managing IoT Devices using Blockchain Platform", _2017 19th International Conference on Advanced Communication Technology (ICACT)_, February 2017
3. A. Dorri, S. Kanhere, R. Jurdak, and P. Gauravaram, "Blockchain for IoT Security and Privacy: The Case Study of a Smart Home," _2017 IEEE International Conference on Pervasive Computing and Communications Workshops (PerCom Workshops)_, March 2017