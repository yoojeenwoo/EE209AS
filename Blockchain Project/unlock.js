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

web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:30305"));

// var stdin = process.openStdin();

// stdin.addListener("Enter password:", function(d) {
//     // note:  d is an object, and when converted to a string it will
//     // end with a linefeed.  so we (rather crudely) account for that  
//     // with toString() and then trim() 
//     console.log("you entered: [" + 
//         d.toString().trim() + "]");
//     pass = d.toString().trim();
//     web3.eth.personal.unlockAccount("0x15fc2f78d606900cb827025ac04617f13ab02e14", pass, 1000);
//   });


function prompt(question, callback) {
    var stdin = process.stdin,
        stdout = process.stdout;

    stdin.resume();
    stdout.write(question);

    stdin.once('data', function (data) {
        callback(data.toString().trim());
    });
}

// prompt('Enter Password: ', function (input) {
//     //pass = input.toString().trim();
//     if (input == "password"){
//     	web3.eth.personal.unlockAccount("0x15fc2f78d606900cb827025ac04617f13ab02e14", input, 1000);
//     	console.log(input)
//     }else{
//     	console.log("shit!")
//     }
// 	//web3.eth.personal.unlockAccount("0x15fc2f78d606900cb827025ac04617f13ab02e14", input, 1000);
//     //console.log(input)
//     process.exit();
// });

web3.eth.personal.unlockAccount("0x15fc2f78d606900cb827025ac04617f13ab02e14", "password", 1000);