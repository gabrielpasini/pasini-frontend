import React, { useEffect, useState } from 'react';
import Axios from '../../config/config-axios';
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
  CircularProgress
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
  const classes = useStyles();
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showToaster, setShowToaster] = useState(false);
  const [showBlockUi, setShowBlockUi] = useState(false);

  const getData = async () => {
    const productRes = await Axios.get('products');
    const cartRes = await Axios.get('cart');
    setProducts(productRes.data);
    setCart(cartRes.data[0].items);
  };

  useEffect(() => {
    setShowBlockUi(true);
    getData()
      .then(() => setShowBlockUi(false));
  }, [])

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
        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={4}>
            {products.map((product, index) => (
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
                    <Typography gutterBottom variant="h5" component="h2" color="primary">
                      <a href={`/info-produto/${product._id}`}>{product.name}</a>
                    </Typography>
                    <Typography variant="h6">
                      <b>{`${product.price.currSymbol}${product.price.valueShow}`}</b>
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" variant="outlined" color="primary" onClick={() => history.push(`/info-produto/${product._id}`)}>
                      + Detalhes
                    </Button>
                    <Hidden mdDown>
                      <Button size="small" endIcon={<ShoppingCart />} variant="contained" color="secondary" onClick={() => updateCart(product._id)}>
                        Adicionar ao carrinho
                      </Button>
                    </Hidden>
                    <Hidden only={['lg', 'xl']}>
                      <Tooltip title="Adicionar ao carrinho">
                        <Button size="small" variant="contained" color="secondary" onClick={() => updateCart(product._id)}>
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
}

export default Products;
