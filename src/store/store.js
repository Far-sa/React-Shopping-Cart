import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import reducer from './rootReducer'
//import logger from './middelware/logger'
import api from './middelware/Api/api'

export default function () {
  return configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(),api]
  })
}
