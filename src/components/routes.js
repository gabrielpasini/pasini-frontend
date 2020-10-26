import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Products from '../pages/products/products';
import Cart from '../pages/cart/cart';
import ProductInfo from '../pages/product-info/product-info';

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
    </BrowserRouter>
  );
};

export default Routes;
