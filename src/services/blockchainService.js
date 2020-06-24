const Blockchain = require('./blockchain').Blockchain
const EC = require('elliptic').ec;

export default class BlockchainService{
    blockchainInstance = new Blockchain();
    walletKeys = [];

    constructor(){
        console.log('Inside constructor of blockchainService');
        this.blockchainInstance.difficulty = 1;
        this.blockchainInstance.minePendingTransactions('my-wallet-address');
        this.generateWalletKeys();
    }

    generateWalletKeys(){
        console.log('Generating wallet keys');
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

    addTransaction(tx){
        console.log('Adding Transaction', tx);
        this.blockchainInstance.addTransaction(tx);
    }

    getPendingTransactions(){
        console.log('Getting Pending Transaction');
        return this.blockchainInstance.pendingTransactions;
    }

    minePendingTransactions(){
        this.blockchainInstance.minePendingTransactions(this.walletKeys[0].publicKey)
    }

    getBalanceOfAddress(address){
        return this.blockchainInstance.getBalanceOfAddress(address);
    }
}