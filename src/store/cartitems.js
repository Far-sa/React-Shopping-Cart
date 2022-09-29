import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    CartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    status: null
  },
  reducers: {
    addToCart (state, action) {
      const itemIndex = state.CartItems.findIndex(
        item => item._id === action.payload._id
      )
      if (itemIndex >= 0) {
        state.CartItems[itemIndex].cartTotalQuantity += 1
      } else {
        const tempProduct = { ...action.payload, cartTotalQuantity: 1 }
        state.CartItems.push(tempProduct)
      }
      localStorage.setItem('cartItems', JSON.stringify(state.CartItems))
    },
    removeFromCart (state, action) {
      const nextCartItems = state.CartItems.filter(
        cartItem => cartItem._id !== action.payload._id
      )
      state.CartItems = nextCartItems
      localStorage.setItem('cartItems', JSON.stringify(state.CartItems))
    },
    decreaseCart (state, action) {
      const itemIndex = state.CartItems.findIndex(
        item => item._id === action.payload._id
      )
      if (state.CartItems[itemIndex].cartTotalQuantity > 1) {
        state.CartItems[itemIndex].cartTotalQuantity -= 1
      } else if (state.CartItems[itemIndex].cartTotalQuantity === 1) {
        const nextCartItems = state.CartItems.filter(
          cartItem => cartItem._id !== action.payload._id
        )
        state.CartItems = nextCartItems
      }
      localStorage.setItem('cartItems', JSON.stringify(state.CartItems))
    },
    clearCart (state, action) {
      state.CartItems = []
      localStorage.setItem('cartItems', JSON.stringify(state.CartItems))
    },
    getTotal (state, action) {
      let { total, quantity } = state.CartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem
          const itemTotal = price * cartQuantity

          cartTotal.total += itemTotal
          cartTotal.quantity += cartQuantity
          return cartTotal
        },
        { total: 0, quantity: 0 }
      )
      state.cartTotalQuantity = quantity
      state.cartTotalAmount = total
    }
  },
  extraReducers: {}
})

export const {
  addToCart,
  removeFromCart,
  decreaseCart,
  clearCart,
  getTotal
} = cartSlice.actions
export default cartSlice.reducer

//* New code
//=========================>
// const initialState = {
//   cartItems: localStorage.getItem("cartItems")
//     ? JSON.parse(localStorage.getItem("cartItems"))
//     : [],
//   cartTotalQuantity: 0,
//   cartTotalAmount: 0,
// };
// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart(state, action) {
//       const existingIndex = state.cartItems.findIndex(
//         (item) => item.id === action.payload.id
//       );
//       if (existingIndex >= 0) {
//         state.cartItems[existingIndex] = {
//           ...state.cartItems[existingIndex],
//           cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
//         };
//         toast.info("Increased product quantity", {
//           position: "bottom-left",
//         });
//       } else {
//         let tempProductItem = { ...action.payload, cartQuantity: 1 };
//         state.cartItems.push(tempProductItem);
//         toast.success("Product added to cart", {
//           position: "bottom-left",
//         });
//       }
//       localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
//     },
//     decreaseCart(state, action) {
//       state.cartItems.map((cartItem) => {
//         if (cartItem.id === action.payload.id) {
//           if (cartItem.cartQuantity > 1) {
//             cartItem = {
//               ...cartItem,
//               cartQuantity: cartItem.cartQuantity - 1,
//             };
//       const itemIndex = state.cartItems.findIndex(
//         (item) => item.id === action.payload.id
//       );

//             const existingIndex = state.cartItems.findIndex(
//               (item) => item.id === cartItem.id
//             );
//       if (state.cartItems[itemIndex].cartQuantity > 1) {
//         state.cartItems[itemIndex].cartQuantity -= 1;

//             state.cartItems[existingIndex] = cartItem;
//         toast.info("Decreased product quantity", {
//           position: "bottom-left",
//         });
//       } else if (state.cartItems[itemIndex].cartQuantity === 1) {
//         const nextCartItems = state.cartItems.filter(
//           (item) => item.id !== action.payload.id
//         );

//             toast.info("Decreased product quantity", {
//               position: "bottom-left",
//             });
//           } else if (cartItem.cartQuantity === 1) {
//             const nextCartItems = state.cartItems.filter(
//               (item) => item.id !== cartItem.id
//             );
//         state.cartItems = nextCartItems;

//             state.cartItems = nextCartItems;
//         toast.error("Product removed from cart", {
//           position: "bottom-left",
//         });
//       }

//             toast.error("Product removed from cart", {
//               position: "bottom-left",
//             });
//           }
//         }
//         localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
//         return state;
//       });
//       localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
//     },
//     removeFromCart(state, action) {
//       state.cartItems.map((cartItem) => {
//         if (cartItem.id === action.payload.id) {
//           const nextCartItems = state.cartItems.filter(
//             (item) => item.id !== cartItem.id
//           );
//           state.cartItems = nextCartItems;
//           toast.error("Product removed from cart", {
//             position: "bottom-left",
//           });
//         }
//         localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
//         return state;
//       });
//     },
//     getTotals(state, action) {
//       let { total, quantity } = state.cartItems.reduce(
//         (cartTotal, cartItem) => {
//           const { price, cartQuantity } = cartItem;
//           const itemTotal = price * cartQuantity;
//           cartTotal.total += itemTotal;
//           cartTotal.quantity += cartQuantity;
//           return cartTotal;
//         },
//         {
//           total: 0,
//           quantity: 0,
//         }
//       );
//       total = parseFloat(total.toFixed(2));
//       state.cartTotalQuantity = quantity;
//       state.cartTotalAmount = total;
//     },
//     clearCart(state, action) {
//       state.cartItems = [];
//       localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
//       toast.error("Cart cleared", { position: "bottom-left" });
//     },
//   },
// });
