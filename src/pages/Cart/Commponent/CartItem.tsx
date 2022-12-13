import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OptModal from './OptModal';
import './CartItem.scss';
import { IP_CONFIG } from '../../../config';

interface CartOpt {
  brandId: number;
  brandName: string;
  images: Array<string>;
  productOptions: Array<{
    productOptionId: number;
    size: string;
    stock: number;
  }>;
}

const cartOptSample = {
  brandId: 2,
  brandName: '나이키 스포츠웨어',
  images: [''],
  productOptions: [],
};

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
  cartItemElement: CartItemTypes;
  setPageReloader: React.Dispatch<React.SetStateAction<boolean>>;
}

function CartItem({ cartItemElement, setPageReloader }: PropsTypes) {
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [optItemInfo, setOptItemInfo] = useState<Array<CartItemTypes>>([]);
  const [cartOptItems, setCartOptItems] = useState<CartOpt>(cartOptSample);

  const accessToken = localStorage.getItem('token');

  const {
    productId,
    discountPrice,
    cartId,
    thumbnail,
    quantity,
    productName,
    size,
    retailPrice,
    styleCode,
  } = cartItemElement;

  const getSeletedCartId = (id: string) => {
    const optInfo = [cartItemElement].filter(
      cartItem => cartItem.cartId === Number(id)
    );
    setOptItemInfo(optInfo);
  };

  const itemInfoGetter = () => {
    setIsOpenModal(prev => !prev);
    getSeletedCartId(String(cartId));
    fetch(`${IP_CONFIG}/carts/${cartId}`, {
      headers: {
        authorization: accessToken || 'noToken',
      },
    })
      .then(res => {
        if (res.ok === true) {
          return res.json();
        }
        throw new Error('에러가 발생했습니다');
      })
      .catch(error => console.log(error))
      .then(data => setCartOptItems(data));
  };

  async function delCartItem(event: React.MouseEvent) {
    fetch(`${IP_CONFIG}/carts/${cartId}`, {
      method: 'DELETE',
      headers: {
        authorization: localStorage.getItem('token') || 'noToken',
      },
    })
      .then(response => response.json())
      .then(result => {
        if (result.message === 'Cart was deleted') {
          alert('선택하신 제품이 삭제되었습니다. ');
          const eventNativeEvent = event.nativeEvent as any;
          eventNativeEvent.path[2].innerHTML = '';
        }
      });
  }

  const postWish = () => {
    fetch(`${IP_CONFIG}/wishlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: accessToken || 'noToken',
      },
      body: JSON.stringify({
        productId,
      }),
    })
      .then(response => response.json())
      .then(result =>
        result.message === 'ALREADY_EXIST'
          ? alert('이미 wishList에 있는 항목입니다.')
          : alert('wishList에 ZZIM')
      );
  };

  const cartDiscountRate = Math.ceil(
    (1 - Number(discountPrice) / Number(retailPrice)) * 100
  );

  const toDetailPage = () => {
    navigate(`/item-detail/${productId}`, {
      state: {
        productId,
      },
    });
  };
  return (
    <li className="cartItem" id={String(cartId)}>
      <img
        role="presentation"
        className="cartItemImg"
        alt="제품"
        src={thumbnail}
        id={String(productId)}
        onClick={() => toDetailPage()}
      />
      <div className="cartItemInfo">
        <h6 className="cartItemTitle">{productName}</h6>
        <p className="cartItemDes">스타일 : {styleCode}</p>
        <p className="cartItemDes">사이즈 : {size}</p>
        <p className="cartItemDes">수량 : {quantity}</p>
      </div>
      <div>
        <button
          type="button"
          className="cartOptChange"
          onClick={itemInfoGetter}
        >
          옵션 변경
        </button>
      </div>
      <span
        className={cartDiscountRate < 100 ? 'cartDiscountRate' : 'discountNone'}
      >
        {cartDiscountRate}%
      </span>
      <div className="cartItemPrice">
        <span
          className={
            Number(discountPrice) === 0 ? 'cartRetailPrice' : 'beforePrice'
          }
        >
          {Number(retailPrice).toLocaleString()}
        </span>
        <p
          className={
            Number(discountPrice) !== 0 ? 'cartRetailPrice' : 'cartPriceNone'
          }
        >
          {Number(discountPrice).toLocaleString()}
        </p>
      </div>
      <button type="button" className="cartDelItem" onClick={delCartItem}>
        <i className="fa-regular fa-trash-can del " />
      </button>
      <button type="button" className="addWishBtn" onClick={postWish}>
        위시리스트에 추가
      </button>
      {isOpenModal && (
        <>
          <div
            role="presentation"
            className="optOverlay"
            onClick={() => setIsOpenModal(false)}
          />
          <OptModal
            setIsOpenModal={setIsOpenModal}
            optItemInfo={optItemInfo}
            cartOptItems={cartOptItems}
            cartDiscountRate={cartDiscountRate}
            setPageReloader={setPageReloader}
          />
        </>
      )}
    </li>
  );
}

export default CartItem;
