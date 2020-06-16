import React, {Fragment, useState, useContext} from 'react';
import Header from '../../components/Header';
import TxDetailsTable from '../../components/TxDetailsTable';
import { Link } from 'react-router-dom';

// Importing from Material-UI
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


import { colors } from '../../assets/styles/ColorPalette';

import BlockchainService from '../../services/blockchainService';
import {Transaction} from '../../services/blockchain';
import {BlockContext} from '../../services/BlockContext';



// Creating new instance of the blockchain services
const blockchainService = new BlockchainService();
// For handling multiple wallet-keys, handle here
const walletKey = blockchainService.walletKeys[0];

const CreateTransactions = () => {
    const {getNewBlocks, pendingTxns, getPendingTxns} = useContext(BlockContext);
    
    // For handling text-inputs
    const [txValues, settxValues] = useState({
        fromAddress: walletKey.publicKey,
        toAddress: '',
        amount: ''
    });
    
    // For opening snackbar on successful transaction creation
    const [open, setOpen] = useState(false);
    const updateValue = e => {
        settxValues({
          ...txValues,
          [e.target.name]: e.target.value
        });
      };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    const createTransaction = () => {
       console.log('Creating Transaction', txValues);
       // Creating new transaction and signing it with our key
       const newTx = new Transaction(txValues.fromAddress, txValues.toAddress, txValues.amount);
       // Signing the transaction
       newTx.signTransaction(walletKey.keyObj);
       // Adding a new transaction
       try {
            blockchainService.addTransaction(newTx);
            settxValues({...txValues, toAddress:'', amount:''})
            const pendingtxns = blockchainService.getPendingTransactions();
            console.log('Pending transactions', pendingtxns);
            if (pendingtxns) {
                setOpen(true);
                //setPendingTx(pendingtxns);
                getPendingTxns(pendingtxns);
            }
        } catch (e) {
            alert(e);
            return;
        }

    }

    const mineTransaction = () => {
        blockchainService.minePendingTransactions();
        console.log(blockchainService.getBlocks());
        const newblocks = blockchainService.getBlocks();
        getNewBlocks(newblocks);
        getPendingTxns(blockchainService.getPendingTransactions());
    }
    
    return(
        <Fragment>
            <Header />
            <Container>
                <h1 style={{fontWeight: 400}}>Transactions</h1>
                <p>Transfer some money, but could be any data</p>
                <div style={{marginTop: 20}}>
                    <TextField
                        id="fromAddredd"
                        label="From Address"
                        name="fromAddress"
                        style={{ margin: 8, width: '50%'}}
                        helperText="This is your wallet address. You cannot change it because you can only spend your own coins."
                        size="small"
                        value = {walletKey.publicKey}
                        margin="normal"
                        disabled
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                </div>
                <div style={{marginTop: 20}}>
                    <TextField
                        id="toAddress"
                        label="To Address"
                        name="toAddress"
                        style={{ margin: 8, width: '50%'}}
                        helperText="The address of the wallet where you want to send the money."   
                        size="small"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={txValues.toAddress}
                        onChange={updateValue}
                        variant="outlined"
                    />
                </div>

                <div style={{marginTop: 20}}>
                    <TextField
                        id="amount"
                        label="Amount"
                        name= "amount"
                        style={{ margin: 8,  width: '50%'}}
                        helperText="Amount to be transferred"
                        size="small"
                        value={txValues.amount}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        onChange={updateValue}
                    />
                </div>

                <div style={{marginTop: 20, marginBottom: 20}}>
                <Button variant="contained" style={{backgroundColor: colors.buttonColor, color: colors.lightText}} onClick={createTransaction}>
                    Sign & Create Transaction
                </Button>
                <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                    }}
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                >
                    <MuiAlert onClose={handleClose} elevation={6} variant="filled" color="info" severity="success">
                        Transaction successfully signed, created, and added in pending transactions list.
                    </MuiAlert>
                </Snackbar>
                </div>
                <h1 style={{fontWeight: 400}}>Pending Transactions</h1>
                {pendingTxns.length > 0?
                    <div>
                        <p>Following are your pending transactions</p>
                        <TxDetailsTable txndata={pendingTxns} />
                        <Link to="/" style={{textDecoration: 'none'}}>
                            <Button variant="contained" style={{backgroundColor: colors.buttonColor, color: colors.lightText, marginBottom: 20}} onClick={mineTransaction}>
                                Start Mining
                            </Button>
                        </Link>
                    </div>
                    :
                    <p style={{color: colors.error}}>You don't have any pending transactions</p>
                }
            </Container>
        </Fragment>
    );
}

export default CreateTransactions;


