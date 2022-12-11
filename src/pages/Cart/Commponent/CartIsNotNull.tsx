import React from 'react';
import CartItem from './CartItem';
import CartAside from './CartAside';
import './CartIsNotNull.scss';
import { IP_CONFIG } from '../../../config';

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

interface PropsTypes {
  cartItems: Array<CartItemTypes>;
  setCartItems: React.Dispatch<React.SetStateAction<CartItemTypes[]>>;
  setPageReloader: React.Dispatch<React.SetStateAction<boolean>>;
}

function CartIsNotNull({
  cartItems,
  setCartItems,
  setPageReloader,
}: PropsTypes) {
  async function delCartItemAll(event: React.MouseEvent) {
    fetch(`${IP_CONFIG}/carts`, {
      method: 'DELETE',
      headers: {
        authorization: localStorage.getItem('token') || 'noToken',
      },
    })
      .then(response => response.json())
      .then(result => {
        if (result.message === 'All carts were deleted') {
          alert('전체제품이 삭제되었습니다.');
          const eventNativeEvent = event.nativeEvent as any;
          eventNativeEvent.path[2].innerHTML = '';
        }
      });
  }
  return (
    <article className="cartWrapper">
      <section className="cartItemsListWrapper">
        <div className="cartItemsListHeader">
          <button
            type="button"
            className="cartDelItems"
            onClick={delCartItemAll}
          >
            전체삭제
          </button>
        </div>
        <ul className="cartItemsList">
          {cartItems &&
            cartItems.map(cartItemElement => (
              <CartItem
                key={cartItemElement.cartId}
                cartItemElement={cartItemElement}
                setPageReloader={setPageReloader}
              />
            ))}
        </ul>
      </section>
      <CartAside cartItems={cartItems} setCartItems={setCartItems} />
    </article>
  );
}

export default CartIsNotNull;
