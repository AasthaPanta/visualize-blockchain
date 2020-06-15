const SHA256 =  require('crypto-js/sha256');
const EC = require('elliptic').ec;

// Instance of elliptic
const ec = new EC('secp256k1');

class Transaction{
    /**
     * 
     * @param {string} fromAddress 
     * @param {string} toAddress 
     * @param {number} amount 
     */
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
        this.timestamp = Date.now();
    }

    /**
     * Creates a SHA256 hash of the transaction
     * 
     * @returns {string}
     */
    calculateHash(){
        return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
    }

    /**
     * Signs a transaction with the given signingkey (which is an Elliptic keypair object
     * that contains private key). The signature is then stored inside the transaction
     * object and later stored on the blockchain
     * 
     * @param {string} signingKey 
     */
    signTransaction(signingKey){
        // You can only send a transaction from the wallet that is linked to your
        // key. So here we check if the fromAddress matches the publickey
        if(signingKey.getPublic('hex') !== this.fromAddress){
            throw new Error('You cannot sign transactions for other wallets');
        }
        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, 'base64');
        this.signature = sig.toDER('hex');
    }

    /**
     * Checks if the signature is valid (transaction has not been tampered with).
     * It uses the fromAddress as the public key.
     * 
     * @returns {boolean}
     * 
     */
    isValid(){
        // If the transaction doesn't have a from address we assume it's a 
        // mining reward and that it is valid.
        if(this.fromAddress === null) return true;

        if(!this.signature || this.signature.length === 0){
            throw new Error('No signature in this transaction');
        }

        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
        return publicKey.verify(this.calculateHash(), this.signature);
    }
}

class Block{
    /**
     * @param {number} timestamp - tells was when the block was created
     * @param {Transaction[]} transactions - includes any type of transactions that we want to associate with this block(incase of currency, transactions is a transactions of currency)
     * @param {string} previousHash - includes the hash of the block before
     */
    constructor(timestamp, transactions, previousHash=''){
        console.log('Inside the constructor of Block');
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    /**
     * Returns the SHA256 of this block (by processing all the data stored inside this block)
     * 
     * @returns {string}
     */
    calculateHash(){
        return SHA256(this.nonce+this.timestamp+this.previousHash+JSON.stringify(this.transactions)).toString()
    }

    /**
     * Starts the mining process on the block. It changes the 'nonce' until the 
     * hash of the block starts with enough zeros (= difficulty)
     * @param {number} difficulty 
     */

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty+1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined:" + this.hash);
    }

    /**
     * Validates all the transactions inside this block (signature + hash) and 
     * returns true if everything checks out.
     * @returns {boolean}
     */
    hasValidTransactions(){
        for(const tx of this.transactions){
            if(!tx.isValid()){
                return false;
            }
        }
        return true;
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    /**
     * @returns {Block}
     */
    createGenesisBlock(){
        return new Block(Date.now(), "Genesis Block", "0");
    }

    /**
     * Returns the latest block on our chain. Useful when you want to create
     * new Block and you need the hash of the previous Block.
     * 
     * @returns {Block[]}
     */
    getLatestBlock(){
        return this.chain[this.chain.length - 1]
    }

    /**
     * Takes all the pending transactions, puts them in a Block and starts the
     * mining process. It also adds a transaction to send the mining reward to the
     * given address
     * 
     * @param {string} miningRewardAddress 
     */
    minePendingTransactions(miningRewardAddress){
        console.log('Mining pending transaction', miningRewardAddress);
        const rewardTx = new Transaction(null, miningRewardAddress, this.miningReward);
        this.pendingTransactions.push(rewardTx);

        const block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);

        console.log('Block successfully mined!');
        this.chain.push(block);

        this.pendingTransactions = [];
    }

    /**
     * Add a new transaction to the list of pending transactions (to be added
     * next time the mining process starts). This verifies that the given
     * transaction is properly signed.
     * 
     * @param {Transaction} transaction 
     */
    addTransaction(transaction){
        console.log('Adding new transaction');
        if(!transaction.fromAddress || !transaction.toAddress){
            throw new Error('Transaction must include from and to address');
        }

        // Verify the transaction
        if(!transaction.isValid()){
            throw new Error('Cannot add invalid transaction to chain');
        }

        this.pendingTransactions.push(transaction);
    }

    /**
     * Returns the balance of a given wallet address.
     * 
     * @param {string} address 
     * @returns {number} The balance of the wallet
     */
    getBalanceOfAddress(address){
        let balance = 0;
        for (const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }

                if(trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    /**
     * Loops over all the blocks in the chain and verify if they are properly
     * linked together and nobody has tampered with the hashes. By checking 
     * the blocks it also verifies the (signed) transactions inside of them.
     * 
     * @returns {boolean}
     */
    isChainValid(){

        // Checking the remaining blocks on the chain to see ig there hashes and
        // signatures are correct
        for(let i  = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(!currentBlock.hasValidTransactions()){
                return false;
            }

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }

        return true;
    }
}

module.exports.Blockchain = Blockchain;
module.exports.Transaction = Transaction;