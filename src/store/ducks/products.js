export const Types = {
  PRODUCTS_FAILURE: '@PRODUCTS/PRODUCTS_FAILURE',
  GET_PRODUCTS: '@PRODUCTS/GET_PRODUCTS',
  GET_PRODUCTS_SUCCESS: '@PRODUCTS/GET_PRODUCTS_SUCCESS',
  GET_PRODUCTS_BY_ID: '@PRODUCTS/GET_PRODUCTS_BY_ID',
  GET_PRODUCTS_BY_ID_SUCCESS: '@PRODUCTS/GET_PRODUCTS_BY_ID_SUCCESS',
  CLOSE_MESSAGE: '@PRODUCTS/CLOSE_MESSAGE',
};

const INIT_STATE = {
  products: [],
  loading: false,
  error: false,
  message: '',
};

export default function products(state = INIT_STATE, action) {
  switch (action.type) {
    case Types.PRODUCTS_FAILURE:
      return { ...state, loading: false, error: true, message: action.message };
    case Types.GET_PRODUCTS:
      return { ...state, products: [], loading: true, message: '' };
    case Types.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload.data,
        loading: false,
        error: false,
        message: action.message,
      };
    case Types.GET_PRODUCTS_BY_ID:
      return { ...state, products: [], loading: true, message: '' };
    case Types.GET_PRODUCTS_BY_ID_SUCCESS:
      return {
        ...state,
        products: action.payload.data,
        loading: false,
        error: false,
        message: action.message,
      };
    case Types.CLOSE_MESSAGE:
      return { ...state, message: '' };
    default:
      return state;
  }
}

export const Creators = {
  getProducts: () => ({
    type: Types.GET_PRODUCTS,
  }),
  getProductsSuccess: (data, message) => ({
    type: Types.GET_PRODUCTS_SUCCESS,
    payload: { data },
    message,
  }),
  getProductsById: (ids) => ({
    type: Types.GET_PRODUCTS_BY_ID,
    payload: { ids },
  }),
  getProductsByIdSuccess: (data, message) => ({
    type: Types.GET_PRODUCTS_BY_ID_SUCCESS,
    payload: { data },
    message,
  }),
  productsFailure: (message) => ({
    type: Types.PRODUCTS_FAILURE,
    message,
  }),
  closeMessage: () => ({
    type: Types.CLOSE_MESSAGE,
  }),
};
