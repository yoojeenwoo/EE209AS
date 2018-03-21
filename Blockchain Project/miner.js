/*
Node script for the miner
Checks the hashes of the firmware binaries installed on each device and compares with manufacturer hash
*/
// Require files module
var fs = require('fs');
var path = require('path');

// Add the web3 node module
var Web3 = require('web3');

// Require crypto node module
var crypto = require('crypto');

// Add the cron node module. allows scheduling of events
var cron = require('node-cron');

// require scp node module. allows secure copy of firmware data
var client = require('scp2');

// Show web3 where it needs to look for the Ethereum node.
//web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:30306"));
web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:30305"));


// The contract address
var addr = "0xc21b34efb431c0a8494be88c8b76fd3018a61241";
// Define the manufacturer's public key

const publicKey = fs.readFileSync('/home/refai/Desktop/keys/public.pem', 'utf-8')
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

device_array = ['192.168.0.18']; 

//miner.js
var numDevices = device_array.length;
var manufacturer_firmware;


var cronJob = cron.schedule('*/'+interval+' * * * * *', function(){
	contract.methods.firmware().call()
	.then(function(response){
		//console.log("Current Firmware is ", response);
		// Define a verifier object
		const verifier = crypto.createVerify('sha256');
		manufacturer_signature = response.substring(2,514).trim();
		manufacturer_firmware = response.substring(514, response.length).trim()
		
		var signature = Buffer.from(manufacturer_signature, 'hex');
		verifier.update(manufacturer_firmware);
		verifier.end();


		// If firmware signature checks out, save firmware to miner node
		var verified = verifier.verify(publicKey, signature);
		if (verified){
			console.log("Manufactuere signature verified")
			var writepath = path.join(__dirname, "FIRMWARE.hex")
			fs.writeFile(writepath, manufacturer_firmware, function(err) {
			    if(err) {
			        return console.log(err);
			    }
			    console.log("Latest firmware saved");
			    
			    // Iterate through devices and check their firmware.
			    // if out of date, update. If not, move on.
			    for (var i = 0; i < numDevices; ++i) {    
					var filepath = path.join(__dirname, 'sensorRequests' + i.toString() + '.txt');
					var buffer = fs.readFileSync(filepath);
					console.log('Device', i.toString(), 'firmware:', buffer.toString());

					if (verified){
						if (buffer != manufacturer_firmware) {
							console.log('Update Required for Device ' + i.toString());
							client.scp("/home/refai/Desktop/EE209AS/Blockchain\ Project/FIRMWARE.hex", {
								host: device_array[i], 
								username: 'pi',
								password: '2018ee209as',
								path: '/home/pi/Desktop/Version/FIRMWARE.hex' 
							}, function(response) {
								//console.log(response)
								console.log("Device successfully updated");
							})
						}else{
							console.log("Device firmware up to date!")
						}
					}else{
						//console.log("Manufacturer Signature not verified. Package will be discarded.")
					}
				}
				console.log('\n');
			}); 
		}else{
			console.log("Manufacturer Signature not verified. Package will be discarded.")
		}
	});
})
