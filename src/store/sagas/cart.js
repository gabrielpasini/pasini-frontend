import { takeLatest, put, select, all, call } from 'redux-saga/effects';
import { Types as CartTypes, Creators as CartActions } from '../ducks/cart';
import Axios from '../../config/config-axios';

function* getCart() {
  try {
    const initialCart = yield call(Axios.get, 'cart');
    yield put(CartActions.getCartSuccess(initialCart.data[0].items));
  } catch (err) {
    yield put(CartActions.cartFailure('Erro ao carregar o carrinho.'));
  }
}

function* addProduct({ payload }) {
  try {
    const cart = yield select((state) => state.cart.products);
    const id = payload.id;
    let newCart = [];
    const idExists = cart.find((i) => i === id);
    if (idExists) {
      // eslint-disable-next-line
      throw { message: 'Este item já existe no carrinho.' };
    } else {
      newCart = [...cart, id];
      yield call(Axios.post, 'cart', {
        items: newCart,
      });
      yield put(
        CartActions.addProductSuccess(id, 'Produto adicionado com sucesso!')
      );
    }
  } catch (err) {
    yield put(CartActions.cartFailure(err.message));
  }
}

function* removeProduct({ payload }) {
  try {
    const cart = yield select((state) => state.cart.products);
    const id = payload.id;
    const newCart = cart.filter((item) => item !== id);
    yield call(Axios.post, 'cart', {
      items: newCart,
    });
    yield put(
      CartActions.removeProductSuccess(id, 'Produto removido com sucesso!')
    );
  } catch (err) {
    yield put(CartActions.cartFailure());
  }
}

export default function* () {
  yield all([
    takeLatest(CartTypes.GET_CART, getCart),
    takeLatest(CartTypes.ADD_PRODUCT, addProduct),
    takeLatest(CartTypes.REMOVE_PRODUCT, removeProduct),
  ]);
}
