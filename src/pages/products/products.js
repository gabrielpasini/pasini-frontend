import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as CartActions } from '../../store/ducks/cart';
import { Creators as ProductsActions } from '../../store/ducks/products';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { ShoppingCart } from '@material-ui/icons';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Container,
  Typography,
  Hidden,
  Tooltip,
  Snackbar,
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

function Toaster(props) {
  return <Alert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '70%', //'56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Products = () => {
  const cart = useSelector((state) => state.cart);
  const products = useSelector((state) => state.products);
  console.log('CART:', cart);
  console.log('PRODUCTS:', products);
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const getInitialData = () => {
    dispatch(ProductsActions.getProducts());
  };

  useEffect(() => {
    getInitialData();
    // eslint-disable-next-line
  }, []);

  const addToCart = (id) => {
    dispatch(CartActions.addProduct(id));
  };

  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    if (cart.error) {
      dispatch(CartActions.closeMessage());
    }
    if (products.error) {
      dispatch(ProductsActions.closeMessage());
    }
  };

  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(CartActions.closeMessage());
  };

  return (
    <>
      <CssBaseline />
      <main>
        <Backdrop className={classes.backdrop} open={cart.loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Snackbar
          open={
            (cart.error && cart.message !== '') ||
            (products.error && products.message !== '')
          }
          autoHideDuration={5000}
          onClose={handleCloseError}
        >
          <Toaster onClose={handleCloseError} severity="warning">
            {cart.error && cart.message !== '' ? cart.message : ''}
            {products.error && products.message !== '' ? products.message : ''}
          </Toaster>
        </Snackbar>
        <Snackbar
          open={!cart.error && cart.message !== ''}
          autoHideDuration={5000}
          onClose={handleCloseSuccess}
        >
          <Toaster onClose={handleCloseSuccess} severity="success">
            {!cart.error && cart.message !== '' ? cart.message : ''}
          </Toaster>
        </Snackbar>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={4}>
            {products.products.map((product, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <a href={`/info-produto/${product._id}`}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={product.profilePath}
                      title={product.name}
                    />
                  </a>
                  <CardContent className={classes.cardContent}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      color="primary"
                    >
                      <a href={`/info-produto/${product._id}`}>
                        {product.name}
                      </a>
                    </Typography>
                    <Typography variant="h6">
                      <b>{`${product.price.currSymbol}${product.price.valueShow}`}</b>
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      variant="outlined"
                      color="primary"
                      onClick={() =>
                        history.push(`/info-produto/${product._id}`)
                      }
                    >
                      + Detalhes
                    </Button>
                    <Hidden mdDown>
                      <Button
                        size="small"
                        endIcon={<ShoppingCart />}
                        variant="contained"
                        color="secondary"
                        onClick={() => addToCart(product._id)}
                      >
                        Adicionar ao carrinho
                      </Button>
                    </Hidden>
                    <Hidden only={['lg', 'xl']}>
                      <Tooltip title="Adicionar ao carrinho">
                        <Button
                          size="small"
                          variant="contained"
                          color="secondary"
                          onClick={() => addToCart(product._id)}
                        >
                          <ShoppingCart />
                        </Button>
                      </Tooltip>
                    </Hidden>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default Products;
