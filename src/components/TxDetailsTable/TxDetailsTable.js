import React from 'react';

// Importing from Material-UI
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { colors } from '../../assets/styles/ColorPalette';

const styles = {
    tableContainer:{
        marginBottom: 40
    },

    tableHead:{
        backgroundColor: colors.primary,
        
    }
}

const TxDetailsTable = ({txndata}) => {
    return(
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
                            <TableCell style={{wordBreak:'break-word'}} align="center">{item.fromAddress === null ? 'System':item.fromAddress}</TableCell>
                            <TableCell align="center">{item.toAddress}</TableCell>
                            <TableCell align="center">{item.amount}</TableCell>
                            <TableCell align="center">{item.timestamp}</TableCell>
                            <TableCell align="center">Yes</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>            
    );
}

export default TxDetailsTable;