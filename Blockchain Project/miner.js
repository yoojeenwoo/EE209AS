/*
Node script for the miner
Checks the hashes of the firmware binaries installed on each device and compares with manufacturer hash
*/
// Require files module
var fs = require('fs');
var path = require('path');

// Add the web3 node module
var Web3 = require('web3');

// Add the cron node module. allows scheduling of events
var cron = require('node-cron');

// Show web3 where it needs to look for the Ethereum node.
web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:30306"));

// The contract address
var addr = "0x756039a002310f018b0ee0b1dcdc03b86a7d90b0";

// Show the Hash in the console.
console.log('Contract Location: ' + addr);

// Define the contract ABI
var abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_device",
				"type": "address"
			},
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_permissions",
				"type": "bytes1"
			}
		],
		"name": "addActuator",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "new_firmware",
				"type": "bytes"
			}
		],
		"name": "pushUpdate",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "kill",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "actuators",
		"outputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "permissions",
				"type": "bytes1"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "firmware",
		"outputs": [
			{
				"name": "",
				"type": "bytes"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "myFirmware",
				"type": "bytes"
			}
		],
		"name": "checkForUpdate",
		"outputs": [
			{
				"name": "updateRequired",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "sensors",
		"outputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "permissions",
				"type": "bytes1"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_device",
				"type": "address"
			},
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_permissions",
				"type": "bytes1"
			}
		],
		"name": "addSensor",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
];

// Define the contract ABI and Address
var contract = new web3.eth.Contract(abi, addr);

// var adr = contract.options.address;
// console.log(adr);

// Interval for execution
var interval = 5;

console.log('-----------------------------------');
console.log('-----------------------------------');

var numDevices = 1;
var manufacturer_firmware;


var cronJob = cron.schedule('*/'+interval+' * * * * *', function(){
	contract.methods.firmware().call()
	.then(function(response){
		console.log("Current Firmware Hash is ", response);
		manufacturer_firmware = response;
		});
	for (var i = 0; i < numDevices; ++i) {    
		var filepath = path.join(__dirname, 'sensorRequests' + i.toString() + '.txt');
		var buffer = fs.readFileSync(filepath);
		console.log('Device ', i.toString(), 'firmware: ', buffer.toString());
		if (buffer != manufacturer_firmware) {
			console.log('Update Required for Device ' + i.toString());
		}
	}
})

web3.eth.personal.unlockAccount("0xb0aac8fc40f56fda315aba59604f1bdb6ce24d9d", "Marwa241", 1000);
