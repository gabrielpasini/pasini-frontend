import { all } from 'redux-saga/effects';
import cartSaga from './cart';
import productsSaga from './products';

export default function* rootSaga() {
  yield all([cartSaga(), productsSaga()]);
}
