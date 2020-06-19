import React, { Fragment, useState, useContext} from 'react';

// Importing from Material-UI
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { colors } from '../../assets/styles/ColorPalette';
import WalletInfo from '../WalletInfo';
import {BlockContext} from '../../services/BlockContext';


const styles = {
    tableContainer:{
        marginBottom: 40
    },

    tableHead:{
        backgroundColor: colors.primary,
        
    },
    addressBody:{
        width:'100%', 
        whiteSpace: 'nowrap', 
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    addressCell:{
        maxWidth: '100px', 
        cursor: 'pointer', 
        color:colors.highlight
    },
    plainCell:{
        maxWidth: '100px', 
    }
}

const TxDetailsTable = ({txndata, linked}) => {
    const {blocks} = useContext(BlockContext);
    
    const [open, setOpen] = useState(false);
    const [walletInfo, setWalletInfo] = useState({address:'', balance: '', transactions:[]});
    
    const handleClose = () => {
        setOpen(false);
    };

    const showWalletDetails = (e) => {
        console.log(e.target.textContent);
        const mybalance = getBalanceOfAddress(e.target.textContent);
        const mytxs = getAllTransactionsForWallet(e.target.textContent);
        console.log('My balance is', mytxs);
        setWalletInfo({...walletInfo, address:e.target.textContent, balance: mybalance, transactions: mytxs});
        setOpen(true)
    }

    const getBalanceOfAddress = (address) => {
        let balance = 0;
        for (const block of blocks){
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

    const getAllTransactionsForWallet = (address) => {
        const txs = [];
        for (const block of blocks) {
            for (const tx of block.transactions) {
              if (tx.fromAddress === address || tx.toAddress === address) {
                txs.push(tx);
              }
            }
        }

        return txs;
    }

    return(
        <Fragment>
            <TableContainer component={Paper} style={styles.tableContainer}>
                <Table  aria-label="customized table">
                    <TableHead style={styles.tableHead}>
                        <TableRow style={{color:'white'}}>
                            <TableCell style={{color: colors.lightText}}>#</TableCell>
                            <TableCell style={{color: colors.lightText}} align="center">From</TableCell>
                            <TableCell style={{color: colors.lightText}} align="center">To</TableCell>
                            <TableCell style={{color: colors.lightText}} align="center">Amount</TableCell>
                            <TableCell style={{color: colors.lightText}} align="center">Timestamp</TableCell>
                            <TableCell style={{color: colors.lightText}} align="center">Valid?</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {txndata.map((item, idx) => (
                            <TableRow key={idx+ item.timestamp} style={idx % 2 === 0 ? {background: colors.background}:{background: colors.primarylight}}>
                                <TableCell>{idx}</TableCell>
                                <TableCell onClick={linked?showWalletDetails:null} style={linked?styles.addressCell:styles.plainCell}  align="center" ><div style={styles.addressBody}>{item.fromAddress === null ? 'System':item.fromAddress}</div></TableCell>
                                <TableCell onClick={linked?showWalletDetails:null}style={linked?styles.addressCell:styles.plainCell} align="center"><div style={styles.addressBody}>{item.toAddress}</div></TableCell>
                                <TableCell align="center">{item.amount}</TableCell>
                                <TableCell align="center">{item.timestamp}</TableCell>
                                <TableCell align="center">Yes</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {   walletInfo &&
                <WalletInfo open={open} handleClose={handleClose} walletInfo={walletInfo} />
            }
        </Fragment> 
               
    );
}

export default TxDetailsTable;