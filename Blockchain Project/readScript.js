/*
A script that returns some filtered events from an Ethereum smart contract.
Your contract will require a solidity event and it will need to be triggered at least once before you run the script.
For an explanation of this code, navigate to the wiki https://github.com/ThatOtherZach/Web3-by-Example/wiki/Getting-Smart-Contract-Events
*/

// Add the web3 node module
var Web3 = require('web3');

// Add the cron node module. allows scheduling of events
var cron = require('node-cron');

// Show web3 where it needs to look for the Ethereum node.
web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/SdO4U3ydQdgK3D3eNE2Y'));

// The address we want to search by.
var addr = "0xdd1327ece57c49f9abafcc5ac478676ae1ca0762";

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
				"name": "_deviceType",
				"type": "string"
			}
		],
		"name": "addActuator",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getHumid",
		"outputs": [
			{
				"name": "humid",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
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
				"name": "deviceType",
				"type": "string"
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
				"name": "temp",
				"type": "uint256"
			}
		],
		"name": "addTemp",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "humid",
				"type": "uint256"
			}
		],
		"name": "addHumid",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
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
		"inputs": [],
		"name": "getTemp",
		"outputs": [
			{
				"name": "temp",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "safetyCheck",
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
		"name": "sensors",
		"outputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "deviceType",
				"type": "string"
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
				"name": "_deviceType",
				"type": "string"
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
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "message",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "temp",
				"type": "uint256"
			}
		],
		"name": "tempAlert",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "message",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "humid",
				"type": "uint256"
			}
		],
		"name": "humidAlert",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "temp",
				"type": "uint256"
			}
		],
		"name": "tempUpdate",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "temp",
				"type": "uint256"
			}
		],
		"name": "humidUpdate",
		"type": "event"
	}
];

// Define the contract ABI and Address
var contract = new web3.eth.Contract(abi, '0xdd1327ece57c49f9abafcc5ac478676ae1ca0762');

// Interval at which you want to read and display the temperature
var interval = 5;

// Fun console text, you can ignore this.
console.log('-----------------------------------');
console.log('Reading Temperature Every ' + interval + ' Seconds');
console.log('-----------------------------------');

// Search the contract events for the hash in the event logs and show matching events.
// contract.getPastEvents('Event1', {
	// filter: {_from: addr},
	// fromBlock: 0,
	// toBlock: 'latest'
	// }, function(error, events){
		// console.log(events);
		// for (i=0; i<events.length; i++) {
			// var eventObj = events[i];
			// console.log('Address: ' + eventObj.returnValues._from);
			// console.log('Greeting: ' + web3.utils.hexToAscii(eventObj.returnValues._greeting));
		// }
// });
// console.log(contract.options.jsonInterface);
// contract.methods.getTemp().call();

var cronJob = cron.schedule('*/'+interval+' * * * * *', function(){
	readTemp();
}) 


function readTemp(){
	web3.eth.call({
    	//to: '0xdd1327ece57c49f9abafcc5ac478676ae1ca0762',
    	to: addr,
    	data: contract.methods.getTemp().encodeABI()
	}).then((response) => {
		response = parseInt(response);
        console.log(response);
    })
}


