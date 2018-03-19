
//CRON TIMING  
/****************************************************************************
var cron = require('node-cron');

var cronJob = cron.schedule("* * * * * *", function(){
	console.log("hello\n")
}) 

// function readTemp(){
// 	web3.eth.call({
//     	//to: '0xdd1327ece57c49f9abafcc5ac478676ae1ca0762',
//     	to: addr,
//     	data: contract.methods.getTemp().encodeABI()
// 	}).then(console.log)
// }
*******************************************************************************/

// CONTRACT TESTING
/*
*/

// Add the web3 node module
var Web3 = require('web3');

// transaction dependencies
var CryptoJS = require('crypto-js') 
var EthJS = require('ethereumjs-tx') 

myPrivateKey = "ef665166f1e3b70c739d3c2c77a0da2ced13ad22009aa4d4b0cc3e84ac7e6c1a"
account = "0x667C93482CFFaEe41C466f7C1B96FE0525eC1068"
var privateKey = new Buffer(myPrivateKey, 'hex')

// Show web3 where it needs to look for the Ethereum node.
web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/SdO4U3ydQdgK3D3eNE2Y'));

// The address of the contract
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

// Fun console text, you can ignore this.
console.log('-----------------------------------');
console.log('Smart Contract Execution');
console.log('-----------------------------------');


web3.eth.defaultAccount = "0x667C93482CFFaEe41C466f7C1B96FE0525eC1068";
web3.eth.getBalance(web3.eth.defaultAccount)
.then(console.log);

web3.eth.getGasPrice()
.then((response) => {
		response = web3.utils.toHex(response);
        console.log(response);
    })
//web3.eth.accounts.create();

//********** MOST RECENT *****************************\
web3.eth.defaultAccount = "0x667C93482CFFaEe41C466f7C1B96FE0525eC1068";



var functionName = 'addTemp'  
var types = ['uint']  
var args = [0]
var fullName = functionName + '(' + types.join() + ')'  
var signature = CryptoJS.SHA3(fullName,{outputLength:256}).toString(CryptoJS.enc.Hex).slice(0, 8)  
var dataHex = signature + web3.eth.abi.encodeParameters(types, args)  
var data = '0x'+dataHex  
var nonce = parseInt(web3.utils.toHex(web3.eth.getTransactionCount(account)))% 2147483647;
var gasPrice = web3.utils.toHex(web3.eth.getGasPrice()) % 2147483647;
//console.log(gasPrice)
// web3.utils.toHex(web3.eth.gasLimit)
// .then(console.log);

var gasLimitHex = web3.utils.toHex(web3.eth.gasLimit)
//console.log(gasLimitHex)

var rawTx = { 
			'nonce': nonce, 
			'gas': "21000",
			'gasPrice': gasPrice, 
			'gasLimit': '21000', 
			'from': web3.eth.defaultAccount, 
			'to': addr, 
			'data': data}  
var tx = new EthJS(rawTx)  
tx.sign(privateKey)  
var serializedTx = '0x'+tx.serialize().toString('hex') 

web3.eth.estimateGas({
	data: web3.eth.abi.encodeParameters(types, args)
}) 
.then(console.log);
web3.eth.sendSignedTransaction(serializedTx, function(err, txHash){ console.log(err, txHash) })

//*/

//console.log(web3.eth.defaultAccount);

// web3.eth.sendTransaction({
//     //to: '0xdd1327ece57c49f9abafcc5ac478676ae1ca0762',
//     to: addr,
//     data: contract.methods.addTemp(0).encodeABI()
// }).then(function(receipt){

// });

// Using methods.myMethod

// contract.methods.addTemp(0).send({from: "0x667C93482CFFaEe41C466f7C1B96FE0525eC1068"}, function(error, transactionHash) {
	// console.log(transactionHash)
// });
// contract.methods.addTemp(0).send({from: "0x667C93482CFFaEe41C466f7C1B96FE0525eC1068"})
// .then(function(receipt) {
	// console.log("hi")
// });

// END CONTRACT TESTING
