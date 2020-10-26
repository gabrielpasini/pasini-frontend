import { takeLatest, put, select, all, call } from 'redux-saga/effects';
import { Types as CartTypes, Creators as CartActions } from '../ducks/cart';
import Axios from '../../config/config-axios';

function* getCart() {
  console.log('inicial');
  const initialCart = yield call(Axios.get, 'cart');
  console.log('antes');
  yield put(CartActions.getCartSuccess(initialCart.data[0].items));
  console.log('depois');
}

function* updateAddCart(action) {
  const response = yield select((state) => state);
  console.log(action);
  console.log(response);
}

function* updateRemoveCart(action) {
  const response = yield select((state) => state);
  console.log(action);
  console.log(response);
}

export default function* () {
  yield all([takeLatest(CartTypes.GET_CART, getCart)]);
}
