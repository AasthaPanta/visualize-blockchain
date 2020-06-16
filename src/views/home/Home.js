import React, { Fragment, useState, useContext} from 'react';
import Header from '../../components/Header';
import TxDetailsTable from '../../components/TxDetailsTable';

// Importing from Material-UI
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import {BlockContext} from '../../services/BlockContext';
import { colors } from '../../assets/styles/ColorPalette';

const styles = {
    paperStyle:{
        height: 375, 
        width: 275,
        backgroundColor: colors.background,
        cursor: 'pointer'
    },
    selectedpaperStyle:{
        height: 375, 
        width: 275,
        backgroundColor: colors.background,
        cursor: 'pointer',
        border: '2px solid',
        borderColor: colors.secondary
    },
    textBlock:{
        padding: '7px 10px'
    },
    mainBlockHeader:{
        fontWeight: 400, 
        padding: '5px 10px'
    },
    subBlockHeader:{
        fontWeight: 400, 
        padding: '5px 10px'
    },
    blockBody:{
        fontSize: 12, 
        color:'red', 
        paddingLeft: 10, 
        marginTop: 0,
        textOverflow: 'ellipsis',
        width: '90%',
        whiteSpace: 'nowrap',
        overflow: 'hidden' 
    },

    tableContainer:{
        marginBottom: 40
    },

    tableHead:{
        backgroundColor: colors.primary,
        
    }

}

const Home = () => {
    const {blocks} = useContext(BlockContext)
    console.log('Obtaing blocks from provider', blocks);
    //For selection of block
    const [isblockSelected, setBlockSelection] = useState(0);
    const [txndata, setTxnData] = useState([]);
    
    const showTransactions = (idx, block) => {
        console.log('Show Transactions', block.transactions)
        setBlockSelection(idx);
        setTxnData(block.transactions)
    }

    
    return(
        
        <Fragment>
            <Header/>
            <Container>
                <h1 style={{fontWeight: 400}}>Blocks on Chain</h1>
                <p>Each card represents a block on a chain. Click on a block to see the transaction.</p>
            </Container> 
            <Container style={{overflowX:'auto', height: 400, marginTop: 20}}>
                <Grid container spacing={2} style={{flexWrap:'nowrap'}}>
                    {blocks.map((item, idx) => (
                        <Grid item xs={3} key={idx + item.timestamp}>
                            <Paper onClick={() => showTransactions(idx, item)} style={idx === isblockSelected?styles.selectedpaperStyle:styles.paperStyle}>
                                <div style={styles.textBlock}>
                                    <Typography variant="h5" component="h2" style={styles.mainBlockHeader}>
                                        Block{item.previousHash ==='0'? <span style={{color: colors.darkText, fontSize: 18, paddingLeft: 2}}>(Genesis block)</span>:idx}
                                    </Typography>
                                </div>
                                <Divider />
                                <div style={styles.textBlock}>
                                    <Typography variant="subtitle1" style={styles.subBlockHeader}>
                                        Hash
                                    </Typography>
                                    <p style={{...styles.blockBody, color:"#"+item.hash.substring(0,6)}}>{item.hash}</p>
                                    <Typography variant="subtitle1" style={styles.subBlockHeader}>
                                        Hash of previous block
                                    </Typography>
                                    <p style={{...styles.blockBody, color:"#"+item.previousHash.substring(0,6)}}>{item.previousHash}</p>
                                </div>
                                <Divider />
                                <div style={styles.textBlock}>
                                    <Typography variant="subtitle1" style={styles.subBlockHeader}>
                                        Nonce
                                    </Typography>
                                    <p style={{...styles.blockBody, color:colors.darkText}}>{item.nonce}</p>                                    
                                </div>
                                <Divider />
                                <div style={styles.textBlock}>
                                    <Typography variant="subtitle1" style={styles.subBlockHeader}>
                                        Timestamp
                                    </Typography>
                                    <p style={{...styles.blockBody, color:colors.darkText}}>{item.timestamp}</p>                                    
                                </div>
                            </Paper>
                        </Grid>
                    ))
                    }    
                </Grid>
            </Container> 
            <Container>
                <h1 style={{fontWeight: 400}}>Transactions inside blocks</h1>
                {isblockSelected === 0 ?
                    <p style={{color: colors.error}}>This block has no transactions</p>
                    :
                    <TxDetailsTable txndata={txndata} />
                }
            </Container>                 
        </Fragment>
        
            
        
    );
}

export default Home;

