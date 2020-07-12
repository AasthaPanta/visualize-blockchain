import React, { useState } from "react";
import BlockchainService from "./blockchainService";

// Creating context object
export const BlockContext = React.createContext("No blocks");

// Getting blocks from the blockchain services
const initial = new BlockchainService();
const Blocks = initial.getBlocks();
const PendingTxns = initial.getPendingTransactions();

// eslint-disable-next-line react/prop-types
export const BlockProvider = ({ children }) => {
  let [blocks, setBlocks] = useState(Blocks);
  let [pendingTxns, setPendingTxns] = useState(PendingTxns);

  const getNewBlocks = (newblocks) => {
    setBlocks(newblocks);
  };

  const getPendingTxns = (txns) => {
    setPendingTxns(txns);
  };

  return (
    <BlockContext.Provider
      value={{ blocks, getNewBlocks, pendingTxns, getPendingTxns }}
    >
      {children}
    </BlockContext.Provider>
  );
};
