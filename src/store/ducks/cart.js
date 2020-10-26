export const Types = {
  CART_FAILURE: '@CART/CART_FAILURE',
  GET_CART: '@CART/GET_CART',
  GET_CART_SUCCESS: '@CART/GET_CART_SUCCESS',
  ADD_PRODUCT: '@CART/ADD_PRODUCT',
  ADD_PRODUCT_SUCCESS: '@CART/ADD_PRODUCT_SUCCESS',
  REMOVE_PRODUCT: '@CART/REMOVE_PRODUCT',
  REMOVE_PRODUCT_SUCCESS: '@CART/REMOVE_PRODUCT_SUCCESS',
  CLOSE_MESSAGE: '@CART/CLOSE_MESSAGE',
};

const INIT_STATE = {
  products: [],
  loading: false,
  error: false,
  message: '',
};

export default function cart(state = INIT_STATE, action) {
  switch (action.type) {
    case Types.CART_FAILURE:
      return { ...state, loading: false, error: true, message: action.message };
    case Types.GET_CART:
      return { ...state, products: [], loading: true, message: '' };
    case Types.GET_CART_SUCCESS:
      return {
        products: action.payload.data,
        loading: false,
        error: false,
        message: '',
      };
    case Types.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products],
        loading: true,
        message: '',
      };
    case Types.ADD_PRODUCT_SUCCESS:
      return {
        products: [...state.products, action.payload.id],
        loading: false,
        error: false,
        message: action.message,
      };
    case Types.REMOVE_PRODUCT:
      return {
        ...state,
        products: [...state.products],
        loading: true,
        message: '',
      };
    case Types.REMOVE_PRODUCT_SUCCESS:
      return {
        products: [
          ...state.products.filter((item) => item !== action.payload.id),
        ],
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
  getCart: () => ({
    type: Types.GET_CART,
  }),
  getCartSuccess: (data, message) => ({
    type: Types.GET_CART_SUCCESS,
    payload: { data },
    message,
  }),
  cartFailure: (message) => ({
    type: Types.CART_FAILURE,
    message,
  }),
  addProduct: (id) => ({
    type: Types.ADD_PRODUCT,
    payload: { id },
  }),
  addProductSuccess: (id, message) => ({
    type: Types.ADD_PRODUCT_SUCCESS,
    payload: { id },
    message,
  }),
  removeProduct: (id) => ({
    type: Types.REMOVE_PRODUCT,
    payload: { id },
  }),
  removeProductSuccess: (id, message) => ({
    type: Types.REMOVE_PRODUCT_SUCCESS,
    payload: { id },
    message,
  }),
  closeMessage: () => ({
    type: Types.CLOSE_MESSAGE,
  }),
};
