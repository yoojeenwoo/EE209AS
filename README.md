# EE209AS

## Abstract
As the Internet of Things (IoT) industry continues to grow, security systems need to develop to ensure that manufacturers can easily and 
reliably issue security updates to their devices. This project investigates a blockchain-based security update system that allows IoT device
manufacturers to push firmware updates to their devices through the use of smart contracts. IoT clusters can autonomously query the blockchain and
download the newest version of their firmware binaries. The same smart contracts also manage device identity, and can be easily extended to enforce 
fine-grained permissions for different types of devices and users.

## Problem
* Traditional smart home IoT systems are reliant on a centralized cloud, a single point of failure
* Traditional smart home IoT systems requires trust in the cloud
* Sensors and actuators can be compromised
* DDoS attacks on sensors?

## Solution
* Implement blockchain-based identity management and permissions system for smart home sensors

## Benefits of Solution
* Enforce principle of least privilege for data access (sensors and actuators only access functions and data they need, 
users of the contract cannot access privileged information)
* Untrusted devices cannot add themselves to the network
* Robustness to protect system in case one of the sensors is compromised (Cloning attack, faked sensor readings)
* Limits DoS attacks on the network, since network transactions cost ether (are untrusted entities capable of obtaining our private ether?)
* Transparent and tamper-proof smart contract code. Smart Contracts provide device autonomy
* Removes third party for establishing trust, reducing operation costs

## Attacker Model
* Assumes no physical access to sensors/actuators
	* System cannot protect sensor data if a sensor is physically compromised
* Can compromise software on some of the sensors/actuators
	* Damage is limited to compromised device; overall network is unaffected because of enforced privileges
* The private keys of the smart contract owner have not been compromised

## System Overview
1. Contract maintains array of trusted IoT sensors and actuators
2. Contract enforces permissions for each device (contract functions check address of caller)
3. Devices added to blockchain (how are devices added? how do we know an added device is trusted?)
4. Contract enforces permissions for users attempting to access devices

The network will be responsible for managing the following transactions:
1. Access data
2. Add devices to the network
3. Remove devices from the network

## Ideas
* Cryptographic hash of firmware stored on blockchain to verify genuine devices [1, 5]
* Software Update System [5, 8, 10, 11]
* Permissions stored on blockchain for user access control [3, 4, 5]
* Secure messaging between devices [1]
	* Transactions are signed and verified cryptographically to ensure sender is trusted
	
## Benefits of Blockchain-Based Software Updates
* Persistence/Immutability of software upgrades towards a given object [9]
* Resilient against availability threats e.g. impersonations, DoS [9]
* Alleviates excessive network traffic from large amounts of simultaneous update requests [10]

## References
1. N. Kshreti, "Can Blockchain Strengthen the Internet of Things?," _IT Professional_, Vol. 19, No. 4, August 2017
2. S. Huh, S. Cho, and S. Kim, "Managing IoT Devices using Blockchain Platform", 
_2017 19th International Conference on Advanced Communication Technology (ICACT)_, February 2017
3. A. Dorri, S. Kanhere, R. Jurdak, and P. Gauravaram, "Blockchain for IoT Security and Privacy: The Case Study of a Smart Home," 
_2017 IEEE International Conference on Pervasive Computing and Communications Workshops (PerCom Workshops)_, March 2017
4. A. Dorri, S. Kanhere, and R. Jurdak, "Towards an Optimized BlockChain for IoT," 
_Proceedings of the Second International Conference on Internet-of-Things Design and Implementation_, April 2017
5. K. Christidis and M. Devetsikiotis, "Blockchains and Smart Contracts for the Internet of Things," _IEEE Access_, Vol. 4, May 2016
6. Y. Aung and T. Tantidham, "Review of Ethereum: Smart Home Case Study," _2017 2nd International Conference on Information Technology (INCIT)_, 
November 2017
7. J. Benet. _IPFS - Content Addressed, Versioned, P2P File System (DRAFT3)_, accessed on Mar. 17, 2018. [Online]. 
Available: https://github.com/ipfs/papers/blob/master/ipfs-cap2pfs/ipfs-p2p-file-system.pdf
8. A. Boudguiga, N. Bouzerna, L. Granboulan, A. Olivereau, F. Quesnel, A. Roger, and R. Sirdey, 
"Towards Better Availability and Accountability for IoT Updates by Means of a Blockchain," 
_2017 IEEE European Symposium on Security and Privacy Workshops (EuroS&PW)_, April 2017
9. K. Özyılmaz and A. Yurdakul, "Work-in-Progress: Integrating Low-Power IoT devices to a Blockchain-Based Infrastructure," 
_2017 International Conference on Embedded Software (EMSOFT)_, October 2017
10. B. Lee and J. Lee, "Blockchain-based secure firmware update for embedded devices in an Internet of Things environment," 
_The Journal of Supercomputing_, Vol. 73, No. 3, March 2017, pp. 1152-1167
11. B. Lee, S. Malik, S. Wi, and J. Lee, "Firmware Verification of Embedded Devices Based on a Blockchain," 
_International Conference on Heterogeneous Networking for Quality, Reliability, Security and Robustness_, 2016, pp. 52-61
12. N. Kshetri. (2018). _Using Blockchain to Secure the "Internet of Things"_. [Online]. 
Available: https://www.scientificamerican.com/article/using-blockchain-to-secure-the-internet-of-things/


