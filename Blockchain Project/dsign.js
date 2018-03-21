
var crypto = require('crypto');

const fs = require('fs')

const privateKey = fs.readFileSync('/home/refai/Desktop/keys/private.pem', 'utf-8')
const publicKey = fs.readFileSync('/home/refai/Desktop/keys/public.pem', 'utf-8')
//const message = fs.readFileSync('message.txt', 'utf-8')

//----------------------------------------------------------------//

const signer = crypto.createSign('sha256');
const message = "some data to sign";

signer.update(message);
signer.end();

//const privateKey = diffHell.getPrivateKey('hex');

const signature = signer.sign(privateKey);
const signature_hex = signature.toString('hex')

//var signed = sign.sign(privateKey, 'hex');
//console.log(signed);
// Prints: the calculated signature using the specified private key and
// SHA-256. For RSA keys, the algorithm is RSASSA-PKCS1-v1_5 (see padding
// parameter below for RSASSA-PSS). For EC keys, the algorithm is ECDSA.


//-----------------------------------------------------------------//


const verifier = crypto.createVerify('sha256');

verifier.update(message);
verifier.end();

console.log("Signature: ", signature);
console.log("Message: ", message);

//const publicKey = diffHell.getPublicKey('hex');
var hunch = Buffer.from(signature_hex, 'hex');
console.log(hunch)
const verified = verifier.verify(publicKey, hunch);

console.log(JSON.stringify({
	message: message,
	signature: signature_hex,
	verified: verified,
}, null, 2));
//const signature = signed;
//console.log(verify.verify(publicKey, signature));
// Prints: true or false