import http from './index'
import * as actions from './apiActions'

const api = ({ dispatch, getState }) => next => async action => {
  if (action.type !== actions.apiCallBegan.type) return next(action)

  const { onError, onSuccess } = action.payload
  next(action)
  try {
    const response = await http.get(`${http.url}/api/products`)

    dispatch(actions.apiCallSuccess(response.data))

    dispatch({ type: onSuccess, payload: response.data })
  } catch (error) {
    dispatch({ type: onError, payload: error.message })
    dispatch(actions.apiCallFailed(error.message))
  }
}
export default api

// import http from './index'

// export const fetchProducts = async () => {
//   try {
//     const res = await http.get(`${http.url}/api/products`)
//     console.log('1', res)
//     return res.data
//   } catch (err) {
//     console.log(err)
//   }
// }
