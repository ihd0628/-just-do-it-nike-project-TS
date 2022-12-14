import React, { useEffect, useState } from 'react';
import CartIsNull from './components/CartIsNull/CartIsNull';
import CartIsNotNull from './components/CartIsNotNull/CartIsNotNull';
import './Cart.scss';
import { IP_CONFIG } from '../../config';
import { CartItemTypes } from './types/cartTypes';

function Cart() {
  const [cartItems, setCartItems] = useState<Array<CartItemTypes>>([]);
  const [pageReloader, setPageReloader] = useState(false);

  useEffect(() => {
    fetch(`${IP_CONFIG}/carts`, {
      method: 'GET',
      headers: {
        authorization: localStorage.getItem('token') || 'noToken',
      },
    })
      .then(response => {
        if (response.ok === true) {
          return response.json();
        }
        throw new Error('에러발생');
      })
      .catch(error => console.log(error))
      .then(data => setCartItems(data.result));
  }, [pageReloader]);

  return (
    <div className="cart">
      <div className="cartHeader">
        <h2 className="cartTitle">장바구니</h2>
        <p className="cartItemsCount">
          <span>{cartItems.length}</span>개 상품
        </p>
      </div>
      {cartItems[0]?.cartId ? (
        <CartIsNotNull
          cartItems={cartItems}
          setCartItems={setCartItems}
          setPageReloader={setPageReloader}
        />
      ) : (
        <CartIsNull />
      )}
    </div>
  );
}

export default Cart;
