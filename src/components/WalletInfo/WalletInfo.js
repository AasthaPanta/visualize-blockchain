import React from 'react';

// Importing components from Material-UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';



import {colors} from '../../assets/styles/ColorPalette';



const WalletInfo = ({open, handleClose, address}) => {  
    console.log('Address', address);
    
    return(
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Your Wallet Details"}</DialogTitle>
        <DialogContent>
          <p>Balance: </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{color: colors.error}} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )
}

export default WalletInfo;