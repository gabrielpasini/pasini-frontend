import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import cart from '../store/ducks/cart';
import rootSaga from './sagas';
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({ cart }),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;
