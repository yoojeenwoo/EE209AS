import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import './../css/index.css'

class App extends React.Component {
   constructor(props){
      super(props)
      this.state = {
         temp_current: 0,
         humid_current: 0,
		 owner: 0,
		 sensors: []
      }

if(typeof web3 != 'undefined'){
         console.log("Using web3 detected from external source like Metamask")
         this.web3 = new Web3(web3.currentProvider)
      }else{
         console.log("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
         this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
      }

const MyContract = web3.eth.contract([
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
		"constant": false,
		"inputs": [
			{
				"name": "humid",
				"type": "uint256"
			}
		],
		"name": "addHumid",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
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
		"constant": false,
		"inputs": [
			{
				"name": "temp",
				"type": "uint256"
			}
		],
		"name": "addTemp",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
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
		"name": "humidUpdate",
		"type": "event"
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
		"constant": false,
		"inputs": [],
		"name": "safetyCheck",
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
				"name": "temp",
				"type": "uint256"
			}
		],
		"name": "tempUpdate",
		"type": "event"
	}
])
      this.state.ContractInstance = MyContract.at("0x4732c7068f47e0fbe5d8f42a808deb9c0409d935")
   }

componentDidMount(){
      this.updateState()
      // this.setupListeners()

setInterval(this.updateState.bind(this), 10e3)
   }

updateState(){
	this.state.ContractInstance.owner((err, result) => {
			 if(result != null){
				this.setState({
				   owner: result
				})
			 }
		  })
	this.state.ContractInstance.getTemp({
				from: web3.eth.accounts[0],
			 }, (err, result) => {
				if (result != null) {
					this.setState({
						temp_current: parseInt(result)
					})
				}
			 })
	this.state.ContractInstance.getHumid({
				from: web3.eth.accounts[0],
			 }, (err, result) => {
				if (result != null) {
					this.setState({
						humid_current: parseInt(result)
					})
				}
			 })
   }

render(){
	return (
        <div className="main-container">
            <h1>My Smart Home Hub</h1>
			<div className="block">
				<b>Owner:</b> &nbsp;
				<span>{this.state.owner}</span>
			</div>
			<div className="block">
				<b>Temperature:</b> &nbsp;
				<span>{this.state.temp_current}</span>
			</div>

			<div className="block">
				<b>Humidity:</b> &nbsp;
				<span>{this.state.humid_current}</span>
			</div>

			<hr/>

			<h2>Control Panel</h2>
			
			<b>Sensor</b>
			Address: <input className="bet-input" ref="ether-bet"/> &nbsp;
			<select><option value="Temperature">Temperature</option></select>&nbsp;
			<button><b> Add</b></button>
			<br/>
			<b>Actuator</b>
			Address: <input className="bet-input" ref="ether-bet"/> &nbsp;
			<select><option value="Display">Display</option></select>&nbsp;
			<button><b> Add</b></button>
        </div>
      )
   }
}

ReactDOM.render(
   <App />,
   document.querySelector('#root')
)