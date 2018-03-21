var systemOnBC = eth.contract([{
    constant: false,
    inputs: [{
        name: "_device",
        type: "address"
    }, {
        name: "_name",
        type: "string"
    }, {
        name: "_permissions",
        type: "bytes1"
    }],
    name: "addActuator",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
}, {
    constant: false,
    inputs: [{
        name: "new_firmware",
        type: "bytes"
    }],
    name: "pushUpdate",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
}, {
    constant: false,
    inputs: [],
    name: "kill",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
}, {
    constant: true,
    inputs: [{
        name: "",
        type: "address"
    }],
    name: "actuators",
    outputs: [{
        name: "name",
        type: "string"
    }, {
        name: "permissions",
        type: "bytes1"
    }],
    payable: false,
    stateMutability: "view",
    type: "function"
}, {
    constant: true,
    inputs: [],
    name: "firmware",
    outputs: [{
        name: "",
        type: "bytes"
    }],
    payable: false,
    stateMutability: "view",
    type: "function"
}, {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [{
        name: "",
        type: "address"
    }],
    payable: false,
    stateMutability: "view",
    type: "function"
}, {
    constant: true,
    inputs: [{
        name: "myFirmware",
        type: "bytes"
    }],
    name: "checkForUpdate",
    outputs: [{
        name: "updateRequired",
        type: "bool"
    }],
    payable: false,
    stateMutability: "view",
    type: "function"
}, {
    constant: true,
    inputs: [{
        name: "",
        type: "address"
    }],
    name: "sensors",
    outputs: [{
        name: "name",
        type: "string"
    }, {
        name: "permissions",
        type: "bytes1"
    }],
    payable: false,
    stateMutability: "view",
    type: "function"
}, {
    constant: false,
    inputs: [{
        name: "_device",
        type: "address"
    }, {
        name: "_name",
        type: "string"
    }, {
        name: "_permissions",
        type: "bytes1"
    }],
    name: "addSensor",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
}, {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
}]).at("0xc21b34efb431c0a8494be88c8b76fd3018a61241")
