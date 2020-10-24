import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Axios from '../config/config-axios';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import {
  Button,
  Drawer,
  Badge,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
  Tooltip,
} from '@material-ui/core';
import {
  Menu,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Store,
  GitHub,
} from '@material-ui/icons';
import Routes from './routes';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  btnCart: {
    right: '24px',
    position: 'fixed',
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
    backgroundColor: '#30A2FF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingTop: '90px',
  },
  white: {
    color: '#FFFFFF',
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

const BaseDrawer = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const getData = async () => {
    const cartRes = await Axios.get('cart');
    setCart(cartRes.data[0].items);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
            aria-label="open drawer"
            onClick={() => handleDrawerOpen()}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <Menu className={classes.white} />
          </IconButton>
          <Hidden xsDown>
            <a href={'/'}>
              <Typography className={classes.white} variant="h6" noWrap>
                LOJINHA.COM
              </Typography>
            </a>
          </Hidden>
          {window.location.pathname !== '/carrinho' ? (
            <div className={classes.btnCart}>
              <Hidden xsDown>
                <Button
                  size="large"
                  variant="contained"
                  color="secondary"
                  href="/carrinho"
                  endIcon={
                    <StyledBadge badgeContent={cart.length} color="error">
                      <ShoppingCart />
                    </StyledBadge>
                  }
                >
                  Carrinho
                </Button>
              </Hidden>
              <Hidden only={['lg', 'md', 'sm', 'xl']}>
                <Tooltip title="Carrinho">
                  <Button
                    size="large"
                    variant="contained"
                    color="secondary"
                    href="/carrinho"
                  >
                    <StyledBadge badgeContent={cart.length} color="error">
                      <ShoppingCart />
                    </StyledBadge>
                  </Button>
                </Tooltip>
              </Hidden>
            </div>
          ) : (
            ''
          )}
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
      >
        <div className={classes.toolbar}>
          <IconButton onClick={() => handleDrawerClose()}>
            {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button component="a" href="/">
            <ListItemIcon>
              <Store />
            </ListItemIcon>
            <ListItemText primary="Produtos" />
          </ListItem>
          <ListItem button component="a" href="/carrinho">
            <ListItemIcon>
              <ShoppingCart />
            </ListItemIcon>
            <ListItemText primary="Carrinho" />
          </ListItem>
          <Divider />
          <ListItem
            button
            component="a"
            href="https://github.com/gabrielpasini"
            target="_blank"
          >
            <ListItemIcon>
              <GitHub />
            </ListItemIcon>
            <ListItemText primary="GitHub" />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <Routes />
      </main>
    </div>
  );
};

export default BaseDrawer;
