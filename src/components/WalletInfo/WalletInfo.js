/* eslint-disable react/prop-types */
import React from "react";

// Importing components from Material-UI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";

import { colors } from "../../assets/styles/ColorPalette";
import TxDetailsTable from "../TxDetailsTable";

const WalletInfo = ({ open, handleClose, walletInfo }) => {
  console.log("Wallet Info", walletInfo);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" style={{ color: colors.secondary }}>
        {"Your Wallet Details"}
      </DialogTitle>
      <DialogContent>
        <div>
          <p
            style={{
              width: "100%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Your Wallet Address:
            <span style={{ color: colors.highlight, marginLeft: 5 }}>
              {walletInfo.address}
            </span>
          </p>
          <p>
            Balance:{" "}
            <span style={{ color: colors.highlight, marginLeft: 5 }}>
              {walletInfo.balance}
            </span>
          </p>
        </div>
        {walletInfo.transactions.length > 0 ? (
          <TxDetailsTable txndata={walletInfo.transactions} />
        ) : (
          <p style={{ color: colors.error }}>No transaction details</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          style={{ color: colors.error, fontSize: 18, fontWeight: "bold" }}
          autoFocus
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WalletInfo;
