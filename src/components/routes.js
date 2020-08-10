import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Products from '../controllers/products/products';
import Cart from '../controllers/cart/cart';
import ProductInfo from '../controllers/product-info/product-info';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Products />
        </Route>
        <Route path="/info-produto">
          <ProductInfo />
        </Route>
        <Route path="/carrinho">
          <Cart />
        </Route>
      </Switch>
    </BrowserRouter>);
};

export default Routes;