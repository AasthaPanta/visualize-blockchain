import React from 'react';
import {Link, NavLink} from 'react-router-dom';

// Importing from Material-UI
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

// Importing styles
import { colors } from '../../assets/styles/ColorPalette';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  header:{
      backgroundColor: colors.primary
  },
  link:{
    textDecoration: 'none',
    color: colors.text
  }
}));

const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" className={classes.title}>
            <NavLink exact to="/" className={classes.link} activeStyle={{ color: colors.highlight}}>
              Blockchain-Visualization
            </NavLink>
          </Typography>
          
          <NavLink to="/settings" className={classes.link} activeStyle={{ color: colors.highlight}}>
            <Button color="inherit" >Settings</Button>
          </NavLink>
          <NavLink to="/createtxns" className={classes.link} activeStyle={{ color: colors.highlight}}>
            <Button color="inherit">Create Transactions</Button>
          </NavLink>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header
