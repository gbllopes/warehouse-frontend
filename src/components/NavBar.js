
import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import { NavLink } from 'react-router-dom';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import AccountCircle from '@material-ui/icons/AccountCircle';
import Domain from '@material-ui/icons/Domain';
import FormatListNumbered from '@material-ui/icons/FormatListNumbered'
import AddCircle from '@material-ui/icons/AddCircle'
import Assignment from "@material-ui/icons/Assignment";
import Build from '@material-ui/icons/Build'
import VpnKey from '@material-ui/icons/VpnKey'
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew'

import {tokenDecode, logout} from '../authentication/oauthHandler'
import { Grid } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  routeActive: {
      backgroundColor: '#babcbf'
  },
  nested: {
      paddingLeft: theme.spacing(4)
  },
  buttonLogout: {
      color: '#fafafa'
  }
}));

export default function NavBar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [menuOpen1, setMenuOpen1] = React.useState(false);
  const [menuOpen2, setMenuOpen2] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }


    const menuItens = [
        {
            permission: "ROLE_ADMIN",
            item: (
                <div  key={0}>
                    <ListItem button onClick={()=> setMenuOpen1(!menuOpen1)}>
                        <ListItemIcon><AccountCircle></AccountCircle></ListItemIcon>
                        <ListItemText primary="Usuario" ></ListItemText>
                        {menuOpen1 ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={menuOpen1} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <NavLink to="/user/register" style={{color: '#696f78', textDecoration: 'none'}} activeClassName={classes.routeActive}>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <AddCircle />
                                    </ListItemIcon>
                                    <ListItemText primary="Cadastrar Usuario" />
                                </ListItem>
                            </NavLink>
                            <NavLink to="/user/permission" style={{color: '#696f78', textDecoration: 'none'}} activeClassName={classes.routeActive}>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <VpnKey />
                                    </ListItemIcon>
                                    <ListItemText primary="Controle de Usuario" />
                                </ListItem>
                            </NavLink>
                        </List>
                    </Collapse>
                </div>
            )
        },
        {
            permission: "ROLE_CADASTRAR",
            item: (
                <div key={1}>

                    <ListItem button onClick={() => setMenuOpen2(!menuOpen2)}>
                        <ListItemIcon><Build /></ListItemIcon>
                        <ListItemText primary="Gerenciamento" ></ListItemText>
                        {menuOpen2 ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>

                    <Collapse in={menuOpen2} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding >
                            <NavLink to="/products/add"style={{color: '#696f78', textDecoration: 'none'}} activeClassName={classes.routeActive}>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <Assignment />
                                    </ListItemIcon>
                                    <ListItemText  primary="Cadastrar Produto"/>
                                </ListItem>
                            </NavLink>
                            <NavLink to="/products"style={{color: '#696f78', textDecoration: 'none'}} activeClassName={classes.routeActive}>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                     <FormatListNumbered />
                                    </ListItemIcon>
                                    <ListItemText  primary="Listar Produtos"/>
                                </ListItem>
                            </NavLink>
                            <NavLink to="/company/add"style={{color: '#696f78', textDecoration: 'none'}} activeClassName={classes.routeActive}>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <Domain />
                                    </ListItemIcon>
                                    <ListItemText  primary="Cadastrar Empresa"/>
                                </ListItem>
                            </NavLink>
                        </List>
                    </Collapse>
                </div>
            )
        }
    ]

    const tokenDecoded = tokenDecode(localStorage.getItem('access_token'));
    const menuHaveAccess = () => {
        if(tokenDecoded && tokenDecoded.authorities){
            const menus = []
            tokenDecoded.authorities.forEach(permission => {
                menuItens.forEach(item => {
                    if(permission.includes(item.permission)){
                        menus.push(item.item);
                    }
                })
            })
            return menus;
        }
        return [];
    }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            ALMOXARIFADO
          </Typography>

          <Grid container direction="row" justify="flex-end" alignItems="center" >
            <IconButton className={classes.buttonLogout} onClick={logout}>
                <PowerSettingsNew  />
            </IconButton>
          </Grid>

        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
            {menuHaveAccess()}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}
