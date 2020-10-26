import { takeLatest, put, call, all } from 'redux-saga/effects';
import {
  Types as ProductsTypes,
  Creators as ProductsActions,
} from '../ducks/products';
import Axios from '../../config/config-axios';

function* getProducts() {
  try {
    const initialProducts = yield call(Axios.get, 'products');
    yield put(
      ProductsActions.getProductsSuccess(
        initialProducts.data,
        'Produtos carregados com sucesso!'
      )
    );
  } catch (err) {
    yield put(
      ProductsActions.productsFailure(
        err.message || 'Erro ao carregar os produtos.'
      )
    );
  }
}

function* getProductsById({ payload }) {
  try {
    const products = yield call(
      Axios.get,
      `products/${JSON.stringify(payload.ids)}`
    );
    yield put(
      ProductsActions.getProductsByIdSuccess(
        products.data,
        'Produtos carregados com sucesso!'
      )
    );
  } catch (err) {
    yield put(
      ProductsActions.productsFailure(
        err.message || 'Erro ao carregar os produtos.'
      )
    );
  }
}

export default function* () {
  yield all([
    takeLatest(ProductsTypes.GET_PRODUCTS, getProducts),
    takeLatest(ProductsTypes.GET_PRODUCTS_BY_ID, getProductsById),
  ]);
}
