import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import cart from '../store/ducks/cart';
import products from '../store/ducks/products';
import rootSaga from './sagas';
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    cart,
    products,
  }),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;
