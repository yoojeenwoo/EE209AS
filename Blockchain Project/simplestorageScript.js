/*
A script that returns some filtered events from an Ethereum smart contract.
Your contract will require a solidity event and it will need to be triggered at least once before you run the script.
For an explanation of this code, navigate to the wiki https://github.com/ThatOtherZach/Web3-by-Example/wiki/Getting-Smart-Contract-Events
*/

// Add the web3 node module
var Web3 = require('web3');

// Add the cron node module. allows scheduling of events
//var cron = require('node-cron');

// Show web3 where it needs to look for the Ethereum node.
//web3 = new Web3(new Web3.providers.HttpProvider('enode://e181c3f17e4236464aea38ea6b87f26409ecb1b084d0cf1446ab33c6058dfd54f3c3d1158ca6faa3aa9b5386eff0b24076b09f43b3d4b441c4c55e0dd2255e86@192.168.0.20:30304?discport=0'));

web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:30304"));

// The address we want to search by.
var addr = "0x1c01b7a5fd5eb6564ece55aa9c2a9c40aa89c8b9";

// Show the Hash in the console.
console.log('Contract Location: ' + addr);

// Define the contract ABI
var abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "x",
				"type": "uint256"
			}
		],
		"name": "set",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "get",
		"outputs": [
			{
				"name": "retVal",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

// Define the contract ABI and Address
var contract = new web3.eth.Contract(abi, '0x1c01b7a5fd5eb6564ece55aa9c2a9c40aa89c8b9');

var adr = contract.options.address;
console.log(adr);
//var contract = new web3.eth.Contract(abi);

// Interval at which you want to read and display the temperature
//var interval = 5;

// Fun console text, you can ignore this.
console.log('-----------------------------------');
//console.log('Reading Temperature Every ' + interval + ' Seconds');
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

//var cronJob = cron.schedule('*/'+interval+' * * * * *', function(){

//readInt();
//}) 
contract.methods.get().call()
.then(function(response){
	console.log("current value is ", response);
	var newval = parseInt(response) + 1;
	contract.methods.set(newval).send({from: '0xb0aac8fc40f56fda315aba59604f1bdb6ce24d9d'})
	.then(function(receipt){
    	// receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
    	

	    contract.methods.get().call()
    	.then(function(response){
    		console.log("New value is ", response);
    	});
	});

});

web3.eth.personal.unlockAccount("0xb0aac8fc40f56fda315aba59604f1bdb6ce24d9d", "Marwa241", 1000);



// contract.methods.set(1).send({from: '0xb0aac8fc40f56fda315aba59604f1bdb6ce24d9d'})
// .then(function(receipt){
//     // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
//     console.log("done sending");

//     contract.methods.get().call()
//     .then(console.log);
// });

// web3.eth.getBalance("0xb0aac8fc40f56fda315aba59604f1bdb6ce24d9d")
// .then(console.log);


// web3.eth.getBlock('latest')
// .then(console.log);
