import React, { useState, useEffect } from 'react'
import { Fade } from 'react-reveal'
import { useSelector, useDispatch } from 'react-redux'
import {
  addToCart,
  removeFromCart,
  decreaseCart,
  clearCart,
  getTotal
} from '../store/cartitems'

const Cart = ({ saveOrder }) => {
  const { CartItems, cartTotalQuantity } = useSelector(
    state => state.entities.Cart
  )
  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(getTotal())
  // }, [Cart,dispatch])

  console.log('Cart', CartItems.length)

  const totalPrice = CartItems.reduce(
    (price, item) => price + item.cartTotalQuantity * item.price,
    0
  )
  const [showCheckout, setshowCheckout] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')

  const createOrder = event => {
    event.preventDefault()
    const order = {
      email,
      name,
      address,
      CartItems
    }
    saveOrder(order)
  }
  return (
    <div className='cart-items'>
      <h2 className='cart-items-header'>Cart Items</h2>
      <div className='clear-cart'>
        {CartItems.length >= 1 && (
          <button
            className='clear-cart-button'
            onClick={() => dispatch(clearCart())}
          >
            Cleer Cart
          </button>
        )}
      </div>
      {CartItems.length === 0 ? (
        <div className='cart cart-header'> No Items Are Added </div>
      ) : (
        <div className='cart cart-header'>
          {' '}
          <p>You have {CartItems.length} in the Cart</p>
        </div>
      )}
      <Fade left cascade>
        <div>
          {CartItems.map(item => (
            <div className='cart' key={item._id}>
              <img
                className='cart-items-image'
                src={item.image}
                alt={item.name}
              />
              <div>{item.title}</div>
              <div>
                <button
                  className='cart-items-add'
                  onClick={() => dispatch(addToCart(item))}
                >
                  {' '}
                  +{' '}
                </button>
                <button
                  className='cart-items-remove'
                  onClick={() => dispatch(decreaseCart(item))}
                >
                  {' '}
                  -{' '}
                </button>
              </div>
              <div className='cart-items-price'>
                {item.quantity} * ${item.price}
              </div>
            </div>
          ))}

          <div className='cart-items-total-price'>{totalPrice}</div>

          <button
            className='button primary'
            onClick={() => setshowCheckout(true)}
          >
            Procced
          </button>

          {showCheckout && (
            <div className='cart'>
              <form onSubmit={() => {}}>
                <ul className='form-container'>
                  <li>
                    <label>Email</label>
                    <input
                      name='email'
                      type='email'
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    ></input>
                  </li>
                  <li>
                    <label>Name</label>
                    <input
                      name='name'
                      type='text'
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                    ></input>
                  </li>
                  <li>
                    <label>Address</label>
                    <input
                      name='address'
                      type='text'
                      required
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                    ></input>
                  </li>
                  <li>
                    <button
                      onClick={createOrder}
                      className='button primary'
                      type='submit'
                    >
                      Checkout
                    </button>
                  </li>
                </ul>
              </form>
            </div>
          )}
        </div>
      </Fade>
    </div>
  )
}

export default Cart
