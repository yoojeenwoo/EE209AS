/*
Node script for the manufacture
Pushes new firmware updates to the blockchain. updates are digitally signed by the manufacturer.
*/
// Require files module
var fs = require('fs');
var path = require('path');

// Require crypto module
var crypto = require('crypto');

// Add the web3 node module
var Web3 = require('web3');

// Add the cron node module. allows scheduling of events
var cron = require('node-cron');

// Show web3 where it needs to look for the Ethereum node.
//web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:30306"));
web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:30305"));

web3.extend({
	property: 'miner',
	methods: [{
		name: 'start',
    	call: 'miner_start',
    	params: 1,
    	inputFormatter: [web3.extend.formatters.formatInputInt],
    	outputFormatter: web3.extend.formatters.formatOutputBool
	},{
		name: 'stop',
        call: 'miner_stop',
        params: 1,
        inputFormatter: [web3.extend.formatters.formatInputInt],
        outputFormatter: web3.extend.formatters.formatOutputBool
	}]
});

// The contract address
var addr = "0xc21b34efb431c0a8494be88c8b76fd3018a61241";

// Define the private key (manufacturer's key)
const privateKey = fs.readFileSync('/home/refai/Desktop/keys/private.pem', 'utf-8')

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


// manufacturer.js

// Define the contract ABI and Address
var contract = new web3.eth.Contract(abi, addr);

// Grab the latest binary
const message = fs.readFileSync('/home/refai/Desktop/hexfiles/firmware.hex', 'utf-8')

//Define signer object
const signer = crypto.createSign('sha256');

var messagepp = "";
for (var i = 0; i< message.length; i++){
	//console.log(package[i])
	if ((message[i] != '\n') && (message[i] != ":")) {
		//console.log(package[i]);
		//package[i] = '';
		//i-=1;
		messagepp += message[i];
	}
}

// load signer buffer
signer.update(messagepp);
signer.end();

const signature = signer.sign(privateKey);
const signature_hex = signature.toString('hex')


//console.log(signature_hex);
var packagepp = "0x" + signature_hex + messagepp;


// Get coinbase
web3.eth.getCoinbase()
.then(function(coinbase){
	// Push new update. Device must be mining!
	web3.miner.start();
	console.log("Waiting for transaction to be mined...")
	contract.methods.pushUpdate(packagepp).send({from: coinbase, gas: 4700000})
	.then(function(receipt){
		// Check new firmware
		web3.miner.stop();
		console.log("Transaction mined!")
	    contract.methods.firmware().call()
		.then(function(response){
			//console.log("New Firmware Hash is ", response);
			manufacturer_signature = response.substring(0,514);
			manufacturer_firmware = response.substring(514, response.length)
			
			console.log("signature:", manufacturer_signature, "\n")
			console.log("firmware:", manufacturer_firmware)
		});
    });	
});
