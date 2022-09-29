import React, { useState, useEffect } from 'react'
import { Fade, Zoom } from 'react-reveal'
import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
//import formatCurrnecy from './../Utils/price'
import { addToCart, removeFromCart } from '../store/cartitems'
//import { loadProducts } from './../store/products'

const Products = () => {
  const { items, status } = useSelector(state => state.entities.Products)
  const dispatch = useDispatch()

  //console.log("P",items)

  // useEffect(() => {
  //   dispatch(loadProducts())
  // }, [])

  // const handleAddToCart = product => {
  //   dispatch(addToCart(product))
  // }
  const [product, setProduct] = useState(null)

  const openModal = product => {
    setProduct(product)
  }

  const closeModel = () => {
    setProduct(null)
  }

  return (
    <div>
      <Fade bottom cascade>
        <ul className='products'>
          {items?.map(product => (
            <li key={product._id}>
              <div className='product'>
                <a href='#' onClick={() => openModal(product)}>
                  <img src={product.image} alt={product.title} />
                  <p>{product.title}</p>
                </a>
                <div className='product-price'>
                  <div>{product.price}</div>
                  <button
                    className='button primary'
                    onClick={() => dispatch(addToCart(product))}
                  >
                    Add To Cart
                  </button>
                  {/* <button
                    className='button primary'
                    onClick={() => dispatch(removeFromCart(product))}
                  >
                    Remove From Cart
                  </button> */}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Fade>
      {product && (
        <Modal isOpen={true} onRequestClose={closeModel}>
          <Zoom>
            <button className='close-modal' onClick={closeModel}>
              x
            </button>
            <div className='product-details'>
              <img src={product.image} alt={product.title}></img>
              <div className='product-details-description'>
                <p>
                  <strong>{product.title}</strong>
                </p>
                <p>{product.id}</p>
                <div className=''>{product.price}</div>
                <button
                  className='button primary'
                  onClick={() => {
                    dispatch(addToCart(product))
                    //handleAddToCart(product)
                    closeModel()
                  }}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </Zoom>
        </Modal>
      )}
    </div>
  )
}

export default Products
