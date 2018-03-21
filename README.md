# Blockchain for Secure IoT Firmware Updates

Ahmed Refai and Eugene Wu

## Abstract
As the Internet of Things (IoT) industry continues to grow, security systems need to develop to ensure that manufacturers can easily and 
reliably issue security updates to their devices. This project investigates a blockchain-based security update system that allows IoT device
manufacturers to push firmware updates to their devices through the use of smart contracts. IoT clusters can autonomously query the blockchain and
download the newest version of their firmware binaries. The same smart contracts also manage device identity, and can be easily extended to enforce 
fine-grained permissions for different types of devices and users.

## Introduction
Over-the-air (OTA) updates for IoT devices allow manufacturers to quickly and conveniently update devices that are already deployed in homes,
industry, power grids, and more. As the number of devices a given manufacturer is responsible for maintaining scales, it becomes more difficult to 
manage the version control and update process required for every device. To solve this, manufacturers must construct complicated 
in-house update management systems or push updates through a rusted third party. Firmware updates that are held on a centralized server are vulnerable 
to denial-of-service attacks, and this can delay critical patches from being applied to vulnerable devices. Firmware update systems also need to 
provide a guarantee of the validity of a firmware update, blocking malicious updates and keeping legitimate ones. In general, such systems should 
satisfy the CIA triad of requirements: confidentiality, integrity, and availability [8].

Blockchain technology has been popularized over the last several years as a potential solution to security problems. The concept was pioneered by
Bitcoin as a digital currency (cryptocurrency) system. Since then, the concept of cryptocurrency has evolved to include smart contracts that allow
users to implement arbitrary logic through the blockchain. Different blockchains can vary in their rules and purposes; there are public blockchains 
adapted for the open exchange of value or information. There are also private blockchains ideal for use in enterprise. Private blockchains require 
new nodes to acquire permission to participate in the network. This allows manufacturers to whitelist trusted participants in the network and
stay closed to the public.

This project aims to implement blockchain-based identity management and firmware update system for smart home sensors. The resilience of the
blockchain to denial-of-service attacks ensures that updates pushed to the blockchain will be continually available to all devices. We will also 
explore the implementation of innocuous checking nodes [8] to guarantee the validity of a firmware binary pushed from the manufacturer. By virtue 
of consensus, a given device can be ensured that, although some nodes in the blockchain may be untrusted, firmware updates can still be verified 
as safe by the consensus of the network as a whole. Furthermore, smart contracts are transparent, tamper-proof, and flexible, allowing for more 
device autonomy with regard to enforcing permissions. Finally, the blockchain provides a public ledger for manufacturers to easily audit successful
and unsuccessful updates to their devices. 


## Benefits of Solution
* Enforce principle of least privilege for data access (sensors and actuators only access functions and data they need, 
users of the contract cannot access privileged information)
* Untrusted devices cannot add themselves to the network
* Robustness to protect system in case one of the sensors is compromised (Cloning attack, faked sensor readings)
* Limits DoS attacks on the network, since network transactions cost ether (are untrusted entities capable of obtaining our private ether?)
* Transparent and tamper-proof smart contract code. Smart Contracts provide device autonomy
* Removes need to build complicated in-house update management systems or trust third-parties, reducing operation costs
* Built-in log for successful and unsuccessful updates
* Supports multiple manufacturers, which is essential as each smart home ecosystem will include devices from a variety of manufacturers
* Trustless

## Attacker Model
* Assumes no physical access to sensors/actuators
	* System cannot protect sensor data if a sensor is physically compromised
* Can compromise software on some of the sensors/actuators
	* Damage is limited to compromised device; overall network is unaffected because of enforced privileges
* The private keys of the smart contract owner have not been compromised

## System Overview
The system will consist of a private, permissioned blockchain that is managed by a manufacturer. The manufacturer maintains one or more nodes in the 
blockchain, and publishes a smart contract into the blockchain to control identity management, firmware updates, and any other logic that must be
implemented for the system. Only the manufacturer has permission to add or remove miner nodes to and from the smart contract's record. The smart 
contract is flexible and can be programmed to enforce permissions on its users. Smart homes are grouped into clusters of IoT devices that are connected 
to one or two "miner" nodes. These nodes act as gateways to the blockchain, interacting with the manufacturer's smart contract.

### Private Blockchain
A private blockchain is on an entirely separate chain from the frequently used public Ethereum blockchain (the mainnet). To start a new blockchain, 
one must create a genesis block. The genesis block sets the parameters that are also true for consecutive blocks. The data in every following block 
will depend on the preceding block in the blockchain, except for the genesis block. After creating the genesis block, nodes in the network can "mine" 
ether and receive and send transactions.

### Smart Contracts

1. Contract maintains array of trusted IoT sensors and actuators
2. Contract enforces permissions for each device (contract functions check address of caller)
3. Devices added to blockchain (how are devices added? how do we know an added device is trusted?)
4. Contract enforces permissions for users attempting to access devices
5. Contract holds most recent manufacturer firmware release; devices periodically check for updates

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
* Peer-to-peer file sharing [7, 8, 10, 11]
	
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


