import { combineReducers } from 'redux'

import productsReducer from './products'
import cartItemsReducer from './cartitems'

export default combineReducers({
  Products: productsReducer,
  Cart: cartItemsReducer
})
