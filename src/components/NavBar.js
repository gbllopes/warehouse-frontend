
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

import InboxIcon from '@material-ui/icons/MoveToInbox';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Domain from '@material-ui/icons/Domain';
import AddCircle from '@material-ui/icons/AddCircle'

import {tokenDecode} from '../authentication/oauthHandler'
import SvgIcon from '@material-ui/icons/Menu';

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
  }
}));

export default function NavBar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [menuOpen, setMenuOpen] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }


    function handleClick() {
      setMenuOpen(!menuOpen);
    }

    const menuItens = [
        {
            permission: "ROLE_ADMIN",
            item: (
                <div  key={0}>
                    <ListItem button onClick={handleClick}>
                        <ListItemIcon><AccountCircle></AccountCircle></ListItemIcon>
                        <ListItemText primary="Usuario" ></ListItemText>
                        {menuOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <NavLink to="/user/register" style={{color: '#696f78', textDecoration: 'none'}} activeClassName={classes.routeActive}>
                        <Collapse in={menuOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                <AddCircle />
                                </ListItemIcon>
                                <ListItemText primary="Cadastrar Usuario" />
                            </ListItem>
                            </List>
                        </Collapse>
                    </NavLink>
                </div>
            )
        },
        {
            permission: "ROLE_EDITAR",
            item: (
                <NavLink to="/products/add" key={1} style={{color: '#696f78', textDecoration: 'none'}} activeClassName={classes.routeActive}>
                    <ListItem button>
                        <ListItemIcon><Domain></Domain></ListItemIcon>
                        <ListItemText  primary="Cadastrar Produto"/>
                    </ListItem>
                </NavLink>
            )
        },
        {
            permission: "ROLE_CADASTRAR",
            item: (
                <NavLink to="/products/edit" key={2} style={{color: '#696f78', textDecoration: 'none'}} activeClassName={classes.routeActive}>
                    <ListItem button>
                        <ListItemIcon><InboxIcon>pen</InboxIcon></ListItemIcon>
                        <ListItemText  primary="Editar Produto"/>
                    </ListItem>
                </NavLink>
            )
        }
    ]

    const tokenDecoded = tokenDecode(localStorage.getItem('access_token'));

    const menuHaveAccess = () => {
        if(tokenDecoded.authorities != undefined){
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
          <Typography variant="h6" noWrap>
            ALMOXARIFADO
          </Typography>
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
