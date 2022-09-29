import React, { useState } from 'react'
import { Provider } from 'react-redux'
import Cart from './components/Cart'
import Filter from './components/Filter'
import Products from './components/products'
//import { fetchProducts } from './Redux/Reducers/productsReducer'
//import { store } from './Redux/Store/index'
import configureStore from './store/store'
import { fetchProducts } from './store/products'
import { getTotal } from './store/cartitems'

const store = configureStore()
store.dispatch(fetchProducts())
//store.dispatch(getTotal())

const App = () => {
  //const [cartItems, setCartItems] = useState([])
  // const [cartItems, setCartItems] = useState(
  //   localStorage.getItem('cartItems')
  //     ? JSON.parse(localStorage.getItem('cartItems'))
  //     : []
  // )

  const saveOrder = order => {
    alert('You need to save your order  ' + order.name)
  }

  // const [size, setSize] = useState('')
  // const [sort, setSort] = useState('')

  // const sortProducts = event => {
  //   // some code
  //   console.log(event.target.value)
  // }

  // const filterProducts = event => {
  //   console.log(event.target.value)
  //   if (event.target.value === '') {
  //     setSize(event.target.value)
  //     setProducts(productItems)
  //   } else {
  //     setSize(event.target.value)
  //     const allProducts = [...productItems]
  //     const filteredProducts = allProducts.filter(
  //       p => p.availableSizes.indexOf(event.target.value) >= 0
  //     )
  //     // const product = allProducts[filteredProducts]

  //     // allProducts[filteredProducts] = product
  //     setProducts(filteredProducts)
  //   }
  // }

  return (
    <Provider store={store}>
      <div className='grid-countainer'>
        <header className='header'>
          <a href='/'>Shopping Cart</a>
        </header>
        <main className='main'>
          <div className='content'>
            <div className='main'>
              {/* <Filter
              size={size}
              sort={sort}
              count={productItems.length}
              filterProducts={filterProducts}
              sortProducts={sortProducts}
            /> */}

              <Products />
            </div>
            <div className='sidebar'>
              <Cart saveOrder={saveOrder} />
            </div>
          </div>
        </main>
        <footer className='footer'>All Right is Reserved</footer>
      </div>
    </Provider>
  )
}

export default App
