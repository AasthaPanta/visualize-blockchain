import React, {useState} from 'react';
import BlockchainService from './blockchainService';

// Creating context object
export const BlockContext = React.createContext('No blocks');

// Getting blocks from the blockchain service
const initialBlocks = new BlockchainService().getBlocks();

export const BlockProvider = ({children}) => {
    let [blocks, setBlocks] = useState(initialBlocks)

    const getNewBlocks = (newblocks) => {
        setBlocks(newblocks);
    }

    return (
        <BlockContext.Provider value={{blocks, getNewBlocks}}>
            {children}
        </BlockContext.Provider>
    );
}

