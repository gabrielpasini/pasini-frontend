import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import Axios from '../../config/config-axios';
import { makeStyles } from '@material-ui/core/styles';
import { Delete, Add } from '@material-ui/icons';
import {
  Button,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  CssBaseline,
  Avatar,
  Container,
  Typography,
  IconButton,
  Tooltip,
  Snackbar,
  Backdrop,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

function Toaster(props) {
  return <Alert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(8),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  marginAvatar: {
    marginRight: '10px',
  },
  total: {
    position: 'fixed',
    height: '40px',
    right: '60px',
  },
  rightBox: {
    position: 'static',
    right: '60px',
    paddingTop: '0px',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Cart = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showToaster, setShowToaster] = useState(false);
  const [showBlockUi, setShowBlockUi] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [productSelected, setProductSelected] = useState(null);

  const getData = async () => {
    const cartRes = await Axios.get('cart');
    const itemIds = cartRes.data[0].items;
    const productRes = await Axios.get(`products/${JSON.stringify(itemIds)}`);
    setProducts(productRes.data);
    setCart(itemIds);
  }

  useEffect(() => {
    setShowBlockUi(true);
    getData()
      .then(() => setShowBlockUi(false));
  }, []);

  const showTotalValue = () => {
    const total = _.sum(products.map(p => p.price.value));
    let priceShow = '';
        const priceStr = total.toString();
        if (priceStr.length > 3) {
            const cents = priceStr.substr(-2, 2);
            const money = priceStr.substr(0, priceStr.length -2);
            priceShow = `${money},${cents}`;
        } else if (priceStr.length === 2) {
            priceShow = `0,${priceStr}`;
        } else {
            priceShow = `0,0${priceStr}`;
        }
      return 'R$' + priceShow;
  };

  const removeFromCart = async id => {
    setShowBlockUi(true);
    const newCart = _.filter(cart, (item) => item !== id);
    await Axios.post('cart', {
      items: newCart
    });
    await getData().then(() => setShowBlockUi(false));
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowToaster(false);
  };

  const showProductDescription = product => {
    setProductSelected(product);
    setShowFullDescription(true);
  }

  const textEllipsis = product => {
    const text = product.description;
    if (text.length >= 60) {
        const short = text.substr(0, 60);
      return (
        <>
          {`${short}...`}
          <Tooltip title="Descrição completa">
            <IconButton
              aria-label="description"
              color="primary"
              onClick={() => showProductDescription(product)}
            >
              <Add fontSize="small" />
            </IconButton>
          </Tooltip>
        </>
      );
    } else {
      return text;
    }
  }

  return (
    <>
      <CssBaseline />
      <main>
        <Backdrop className={classes.backdrop} open={showBlockUi}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Snackbar open={showToaster} autoHideDuration={5000} onClose={handleClose}>
          <Toaster onClose={handleClose} severity="info">
            Opção indisponível! Em breve...
          </Toaster>
        </Snackbar>
        {productSelected ? (
          <Dialog
            open={showFullDescription}
            onClose={() => setShowFullDescription(false)}
            scroll="paper"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            <DialogTitle id="scroll-dialog-title">{productSelected.name}</DialogTitle>
            <DialogContent dividers="paper">
              <DialogContentText
                id="scroll-dialog-description"
                tabIndex={-1}
              >
                {productSelected.description}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowFullDescription(false)} color="primary">
                Fechar
              </Button>
            </DialogActions>
          </Dialog>
        ) : ('')}
        <Container className={classes.cardGrid} maxWidth="lg">
          <List className={classes.root}>
            { products.length ? products.map((product, index) => (
              <div key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar className={classes.marginAvatar}>
                    <a href={`/info-produto/${product._id}`}>
                      <Avatar className={classes.large} alt={`${index}_${product._id}`} src={product.profilePath} />
                    </a>
                  </ListItemAvatar>
                  <ListItemText
                    primary={<a href={`/info-produto/${product._id}`}>{product.name}</a>}
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          {textEllipsis(product)}
                        </Typography>
                      </>
                    }
                  />
                  <div className={classes.rightBox}>
                    <ListItemText
                      primary={
                        <Typography
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          <Tooltip title="Remover do carrinho">
                            <IconButton
                              aria-label="delete"
                              color="secondary"
                              onClick={() => removeFromCart(product._id)}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          {`${product.price.currSymbol}${product.price.valueShow}`}
                        </Typography>
                      }
                    />
                  </div>
                </ListItem>
                <Divider variant="inset" component="li" />
              </div>
            )) : (
              <>
                <ListItem>
                  <ListItemText
                    primary={`Seu carrinho está vazio...`}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </>
            )}
            <ListItem>
              <ListItemText
                primary={`Produtos no carrinho: ${products.length}`}
              />
              <div className={classes.rightBox}>
                {`VALOR TOTAL: `}
                <Typography
                  variant="h6"
                  className={classes.inline}
                  color="primary"
                >
                  <b>{showTotalValue()}</b>
                </Typography>
              </div>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemText
                primary={
                  <Button size="small" variant="contained" color="secondary" href="/">
                    Continuar Comprando
                  </Button>
                }
              />
              <div className={classes.rightBox}>
                <Button disabled={!cart.length} size="large" variant="contained" color="primary" onClick={() => setShowToaster(true)}>
                  PAGAR
                </Button>
              </div>
            </ListItem>
          </List>
        </Container>
      </main>
    </>
  );
}

export default Cart;
