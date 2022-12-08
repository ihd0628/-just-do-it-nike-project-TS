import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './Modal.scss';
import ModalContentBox from './ModalContentBox/ModalContentBox';

interface PropsTypes {
  closeModal: () => void;
}

interface ProductOption {
  size: string;
  stock: number;
  productOptionId: string;
}

interface ThumbailInfo {
  id: string;
  thumbnail: string;
}

interface ReviewInfo {
  id: number;
  starScore: number;
  fullName: string;
  createdAt: string;
  content: string;
}

interface Product {
  isWished: boolean;
  productOptions: Array<ProductOption>;
  imageURL: Array<string>;
  brandName: string;
  color: string;
  review: Array<ReviewInfo>;
  getThumbnail: Array<ThumbailInfo>;
  description: string;
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

function Modal({ closeModal }: PropsTypes) {
  let totalPrice = 0;

  const accessToken = localStorage.getItem('token');
  const [result, setResult] = useState<Array<Product>>([]);
  useEffect(() => {
    fetch(`http://192.168.243.200:8000/carts`, {
      method: 'GET',
      headers: {
        authorization: accessToken || '',
      },
    })
      .then(response => response.json())
      .then(data => setResult(data.result));
    // .then(result => console.log('cart result : ', result));
  }, [result]);

  for (let i = 0; i < result.length; i += 1) {
    if (result[i].discountPrice) {
      totalPrice += Number(result[i].discountPrice) * result[i].quantity;
    } else {
      totalPrice += Number(result[i].retailPrice) * result[i].quantity;
    }
  }
  let key = 0;

  return (
    <div>
      <div className="modal">
        <div role="presentation" onClick={closeModal} className="overlay" />

        <div className="modalContent">
          <div className="modalWrapper">
            <h2 className="modalSmallBasket">미니 장바구니</h2>
            <div className="modalMap">
              {result.map(cartItem => {
                key += 1;
                return (
                  <ModalContentBox
                    cartId={cartItem.cartId}
                    key={key}
                    product={cartItem.productName}
                    getThumbnail={cartItem.thumbnail}
                    shooseSize={cartItem.size}
                    quantity={cartItem.quantity}
                    retailPrice={cartItem.retailPrice}
                    styleCode={cartItem.styleCode}
                    discountPrice={cartItem.discountPrice}
                  />
                );
              })}
            </div>

            <div className="modalPurchase">
              <div className="modalPrice">
                <div className="modaItemPrice">총 상품금액</div>
                <div className="modalShoesPrice">
                  {totalPrice.toLocaleString()}원
                </div>
              </div>
              <div className="modaItemPrice">
                배송비는 주문서에서 확인이 가능합니다.
              </div>
              <div className="modalBasketBuy">
                <button type="button" className="modalBasket">
                  <Link to="/cart">장바구니 가기</Link>
                </button>
                <button type="button" className="modalBuy">
                  바로 구매
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
