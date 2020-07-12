import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

// Importing from Material-UI
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import Badge from "@material-ui/core/Badge";

// Importing assets
import { colors } from "../../assets/styles/ColorPalette";
import Logo from "../../assets/images/logoXL.png";

import { BlockContext } from "../../services/BlockContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: colors.primary,
  },
  title: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: colors.background,
  },
  link: {
    textDecoration: "none",
    color: colors.primary,
  },
}));

const Header = () => {
  const classes = useStyles();
  const { pendingTxns } = useContext(BlockContext);
  const numberofpendingtxns = pendingTxns.length;
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <img src={Logo} alt="logo" style={{ height: 50, width: 50 }} />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            <NavLink
              exact
              to="/"
              className={classes.link}
              activeStyle={{ color: colors.secondary }}
            >
              Blockchain-Visualization
            </NavLink>
          </Typography>

          <NavLink
            to="/settings"
            className={classes.link}
            activeStyle={{ color: colors.secondary }}
          >
            <Button size="small" variant="outlined" color="inherit">
              Settings
            </Button>
          </NavLink>
          <NavLink
            to="/createtxns"
            className={classes.link}
            activeStyle={{ color: colors.secondary }}
          >
            <Badge
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              badgeContent={numberofpendingtxns}
              color="secondary"
            >
              <Button
                size="small"
                variant="outlined"
                color="inherit"
                style={{ marginLeft: 5 }}
              >
                Create Transactions
              </Button>
            </Badge>
          </NavLink>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
