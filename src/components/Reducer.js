const Reducer = (cart = [], action, state) => {
  if (action.type === "ADD_BOOK") {
    let tempcart = cart.filter((book) => book.isbn13 === action.payload.isbn13);
    if (tempcart < 1) {
      return [...cart, action.payload];
    } else {
      return cart;
    }
  }
  if (action.type === "REMOVE_BOOK") {
    return cart.filter((book) => book.isbn13 !== action.payload.isbn13);
  }
  if (action.type === "INCREASE") {
    let tempcart = cart.map((book) => {
      if (book.isbn13 === action.payload.isbn13) {
        return { ...book, qty: book.qty + 1 };
      }
      return book;
    });
    return tempcart;
  }
  if (action.type === "DECREASE") {
    let tempcart = cart.map((book) => {
      if (book.isbn13 === action.payload.isbn13) {
        return { ...book, qty: book.qty - 1 };
      }
      return book;
    });
    return tempcart;
  }
  if (action.type === "EMPTY_CART") {
    return {
      ...state,
      cart: action.cart,
    };
  }

  return cart;
};
export const initialState = {
  cart: [],
  shippingData: {},
  paymentMessage: "",
};

export const actionTypes = {
  SET_SHIPPINGDATA: "SET_SHIPPINGDATA",
  SET_PAYMENT_MESSAGE: "SET_PAYMENT_MESSAGE",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SHIPPINGDATA":
      return {
        ...state,
        shippingData: action.shippingData,
      };
    case "SET_PAYMENT_MESSAGE":
      return {
        ...state,
        paymentMessage: action.paymentMessage,
      };
    default:
      return state;
  }
};
export default Reducer;
