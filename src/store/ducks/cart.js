export const Types = {
  ADD_PRODUCT: '@CART/ADD_PRODUCT',
  REMOVE_PRODUCT: '@CART/REMOVE_PRODUCT',
  GET_CART: '@CART/GET_CART',
  GET_CART_SUCCESS: '@CART/GET_CART_SUCCESS',
  GET_CART_FAILURE: '@CART/GET_CART_FAILURE',
};

const INIT_STATE = {
  products: [],
  loading: false,
};

export default function cart(state = INIT_STATE, action) {
  switch (action.type) {
    case Types.GET_CART:
      return { ...state, products: [], loading: true };
    case Types.GET_CART_SUCCESS:
      console.log('ACTION', action);
      return { ...state, products: action.payload.data, loading: false };
    case Types.GET_CART_FAILURE:
      return { ...state, loading: false };
    case Types.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload.data],
      };
    case Types.REMOVE_PRODUCT:
      return {
        ...state,
        products: [
          ...state.products.filter((item) => item !== action.payload.id),
        ],
      };
    default:
      return state;
  }
}

export const Creators = {
  getCart: () => ({
    type: Types.GET_CART,
  }),
  getCartSuccess: (data) => ({
    type: Types.GET_CART_SUCCESS,
    payload: { data },
  }),
  getCartFailure: () => ({
    type: Types.GET_CART_FAILURE,
  }),
  addProduct: (data) => ({
    type: Types.UPDATE_ADD_CART,
    payload: { data },
  }),
  removeProduct: (id) => ({
    type: Types.REMOVE_PRODUCT,
    payload: { id },
  }),
};
