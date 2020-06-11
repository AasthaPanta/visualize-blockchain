import React, { Fragment } from 'react';
import Header from '../../components/Header';

// Importing from Material-UI
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider'

import BlockchainService from '../../services/blockchainService';

import { colors } from '../../assets/styles/ColorPalette';

const styles = {
    paperStyle:{
        height: 375, 
        width: 275,
        backgroundColor: colors.background,
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

}

const Home = () => {
    const blocks = new BlockchainService().getBlocks();
    console.log('Blocks', blocks);
    
    return(
        <Fragment>
            <Header/>
            <Container>
                <h1>Blocks on Chain</h1>
                <p>Each card represents a block on a chain. Click on a block to see the transaction.</p>
            </Container> 
            <Container>
                <Grid container spacing={2}>
                    {blocks.map((item =>
                        <Grid item xs={3}>
                            <Paper style={styles.paperStyle}>
                                <div style={styles.textBlock}>
                                    <Typography variant="h5" component="h2" style={styles.mainBlockHeader}>
                                        Block 1
                                    </Typography>
                                </div>
                                <Divider />
                                <div style={styles.textBlock}>
                                    <Typography variant="subtitle1" style={styles.subBlockHeader}>
                                        Hash
                                    </Typography>
                                    <p style={{...styles.blockBody, color: colors.secondary}}>{item.hash}</p>
                                    <Typography variant="subtitle1" style={styles.subBlockHeader}>
                                        Hash of previous block
                                    </Typography>
                                    <p style={{...styles.blockBody, color: colors.highlight}}>{item.previousHash}</p>
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
                    ))}
                </Grid>
            </Container>       
        </Fragment>
            
        
    );
}

export default Home;

/*
 {blocks.map((item =>
                        <span key={item.timestamp}>{item.hash}</span>
                    ))} */