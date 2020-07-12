import React, { Fragment } from "react";
import Header from "../../components/Header";

import BlockchainService from "../../services/blockchainService";
import { colors } from "../../assets/styles/ColorPalette";

// Importing from Material-UI
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Settings = () => {
  const blockchain = new BlockchainService().blockchainInstance;

  // saving settings value
  const saveSettings = () => {
    console.log("Saving settings value");
  };

  return (
    <Fragment>
      <Header />
      <Container>
        <h1 style={{ fontWeight: 400 }}>Settings</h1>
        <p>
          Control how the blockchain behaves when new transactions or blocks are
          created. Changes are saved.
        </p>
        <div style={{ marginTop: 40 }}>
          <TextField
            id="outlined-full-width"
            label="Difficulty"
            value={blockchain.difficulty}
            style={{ margin: 8, width: "50%" }}
            placeholder="Placeholder"
            helperText="Controls how long the mining process takes. Higher number will make mining slower. Default: 2"
            size="small"
            type="number"
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </div>
        <div style={{ marginTop: 40 }}>
          <TextField
            id="outlined-full-width"
            label="Mining Reward"
            style={{ margin: 8, width: "50%" }}
            value={blockchain.miningReward}
            placeholder="Placeholder"
            helperText="How much 'coins' a miner receives for successfully creating a new block for the chain. Default: 100"
            size="small"
            type="number"
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </div>
        <div style={{ marginTop: 20, marginBottom: 20 }}>
          <Button
            variant="contained"
            style={{
              backgroundColor: colors.buttonColor,
              color: colors.lightText,
            }}
            onClick={saveSettings}
          >
            Save
          </Button>
        </div>
      </Container>
    </Fragment>
  );
};

export default Settings;
