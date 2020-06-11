import {Blockchain} from './blockchain';
const EC = require('elliptic').ec;

export default class BlockchainService{
    blockchainInstance = new Blockchain();
    walletKeys = [];

    constructor(){
        
        this.blockchainInstance.difficulty = 1;
        this.blockchainInstance.minePendingTransactions('my-wallet-address');
        
        this.generateWalletKeys();
    }

    generateWalletKeys(){
        // Instance of elliptic
        const ec = new EC('secp256k1');

        // Generating key pair
        const key = ec.genKeyPair();

        this.walletKeys.push({
            keyObj: key,
            publicKey:key.getPublic('hex'),
            privateKey:key.getPrivate('hex')
        })
    }

    getBlocks(){
        return this.blockchainInstance.chain;
    }
}