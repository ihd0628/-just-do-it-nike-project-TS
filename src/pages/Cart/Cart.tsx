import React, { useEffect, useState } from 'react';
import CartIsNull from './Commponent/CartIsNull';
import CartIsNotNull from './Commponent/CartIsNotNull';
import './Cart.scss';
import { IP_CONFIG } from '../../config';

interface CartItemTypes {
  cartId: number;
  userId: number;
  styleCode: string;
  quantity: number;
  productOptionId: number;
  productId: number;
  productName: string;
  sizeId: number;
  size: string;
  stock: number;
  retailPrice: string;
  discountPrice: string;
  thumbnail: string;
}

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
