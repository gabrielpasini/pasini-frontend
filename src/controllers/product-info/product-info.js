import React, { useEffect, useState } from 'react';
import Axios from '../../config/config-axios';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 'react-material-ui-carousel'
import {
  Button,
  Divider,
  CssBaseline,
  Typography,
  Hidden,
  Tooltip,
  Card,
  CardMedia,
  CardContent,
  Snackbar,
  IconButton,
  Backdrop,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import { ShoppingCart, Add } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { Alert } from '@material-ui/lab';

function Toaster(props) {
  return <Alert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    alignItems: 'right',
    maxWidth: '50%',
  },
  cover: {
    width: '480px',
    height: '480px',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const ProductInfo = () => {
  const classes = useStyles();
  const history = useHistory();
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [showToaster, setShowToaster] = useState(false);
  const [showBlockUi, setShowBlockUi] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const getData = async () => {
    const id = window.location.pathname.split('/')[2];
    if (id) {
      const resProduct = await Axios.get(`products/${JSON.stringify([id])}`);
      setProduct(resProduct.data[0]);
    }
    const cartRes = await Axios.get('cart');
    setCart(cartRes.data[0].items);
  }

  useEffect(() => {
    setShowBlockUi(true);
    getData()
      .then(() => setShowBlockUi(false));
  }, []);

  const updateCart = async id => {
    setShowBlockUi(true);
    let newCart = [];
    const idExists = cart.find(i => i === id);
    if (idExists) {
      setShowBlockUi(false);
      setShowToaster(true);
      return;
    } else {
      newCart = [...cart, id];
    }
    await Axios.post('cart', {
      items: newCart
    }).then(() => setShowBlockUi(false));
    history.push("/carrinho");
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowToaster(false);
  };

  const textEllipsis = text => {
    if (text.length >= 240) {
        const short = text.substr(0, 240);
      return (
        <>
          {`${short}...`}
          <Tooltip title="Descrição completa">
            <IconButton
              aria-label="description"
              color="primary"
              onClick={() => setShowFullDescription(true)}
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
          <Toaster onClose={handleClose} severity="warning">
            Este produto já está no carrinho!
          </Toaster>
        </Snackbar>
        {product ? (
          <>
            <Dialog
              open={showFullDescription}
              onClose={() => setShowFullDescription(false)}
              scroll="paper"
              aria-labelledby="scroll-dialog-title"
              aria-describedby="scroll-dialog-description"
            >
              <DialogTitle id="scroll-dialog-title">{product.name}</DialogTitle>
              <DialogContent dividers="paper">
                <DialogContentText
                  id="scroll-dialog-description"
                  tabIndex={-1}
                >
                  {product.description}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setShowFullDescription(false)} color="primary">
                  Fechar
                </Button>
              </DialogActions>
            </Dialog>
            <Card className={classes.root}>
              <Carousel
                indicators={false}
                animation="slide"
                autoplay={false}
                strictIndexing={true}
              >
                {
                  [product.profilePath, ...product.imagesPath].map((url, index) => (
                    <CardMedia
                      key={index}
                      className={classes.cover}
                      image={url}
                      title={product.name}
                    />
                  ))
                }
              </Carousel>
                <div className={classes.details}>
                  <CardContent className={classes.content}>
                    <Typography component="h5" variant="h4">
                      {product.name}
                    </Typography>
                    <Divider />
                    <Typography color="textSecondary" className="description-ellipsis">
                      {textEllipsis(product.description)}
                    </Typography>
                    <Divider />
                    <Typography variant="h4" color="primary">
                      {`${product.price.currSymbol}${product.price.valueShow}`}
                    </Typography>
                  </CardContent>
                  <div className={classes.controls}>
                    <Hidden smDown>
                      <Button size="large" endIcon={<ShoppingCart />} variant="contained" color="secondary" onClick={() => updateCart(product._id)}>
                        Adicionar ao carrinho
                      </Button>
                    </Hidden>
                    <Hidden only={['md', 'lg', 'xl']}>
                      <Tooltip title="Adicionar ao carrinho">
                        <Button size="large" variant="contained" color="secondary" onClick={() => updateCart(product._id)}>
                          <ShoppingCart />
                        </Button>
                      </Tooltip>
                    </Hidden>
                  </div>
                </div>
            </Card>
          </>
        ) : ('')}
      </main>
    </>
  );
}

export default ProductInfo;
