import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
//import axios from 'axios'
import { getProducts } from './../Api/productsApi'

// export const fetchProducts = createAsyncThunk(
//   'products/fetchProducts',
//   async (id = null, { rejectWithValue }) => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/products')
//       return response.data
//     } catch (error) {
//       return rejectWithValue(error.response.data)
//     }
//   }
// )
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const data = await getProducts()
    return data
  }
)

const produtcsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: null,
    error: null
  },
  reducers: {},
  extraReducers: {
    [fetchProducts.pending]: (state, action) => {
      state.status = 'pending'
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.status = 'success'
      state.items = action.payload
    },
    [fetchProducts.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    }
  }
})

export default produtcsSlice.reducer
