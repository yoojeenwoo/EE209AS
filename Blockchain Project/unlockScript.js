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

web3.eth.personal.unlockAccount("0xb0aac8fc40f56fda315aba59604f1bdb6ce24d9d", "Marwa241", 1000);