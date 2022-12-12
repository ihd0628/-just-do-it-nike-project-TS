import React, { useEffect, useState } from 'react';
import './ItemDetail.scss';
import { useParams } from 'react-router-dom';
import ShoesSize from './components/ShoesSize/ShoesSize';
import DetailImgs from './components/DetailImgs/DetailImgs';
import Counter from './components/Counter/Counter';
import Modal from './components/Modal/Modal';
import ShoesColor from './components/ShoesColor/ShoesColor';
import ShoesModal from './components/ShoesModal/ShoesModal';
import Review from './components/Review/Review';
import { IP_CONFIG } from '../../config';
import { Product, productSample } from './types/ItemDetailTypes';
import PRODUCT_MOCK from './mockData/productMock';

function ItemDetail() {
  const [modal, setModal] = useState(false);
  const [product, setProduct] = useState<Product>(productSample);
  // const [result, setResult] = useState([]);
  const [shooseSize, setShooseSize] = useState('');
  const [shoesModal, setShoesModal] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [quantity, setquantity] = useState(1);
  const [productOptionId, setProductOptionId] = useState(0);
  const [isWished, setIsWished] = useState({});

  // const iswished = product.isWished;
  const token = localStorage.getItem('token');
  const [accessToken] = useState(token);
  const params = useParams();
  const { productId } = params;

  const [selectedId, setSelectedId] = useState('');
  // const { stock } = product;

  console.log('product : ', product);

  useEffect(() => {
    setProduct(PRODUCT_MOCK[0]);

    fetch(`${IP_CONFIG}/product/${productId}`, {
      method: 'GET',
      headers: {
        authorization: localStorage?.getItem('token') || '',
      },
    })
      .then(res => res.json())
      .then(data => {
        setIsWished(data[0].isWished);
        setProduct(data[0]);
      });
  }, []);

  useEffect(() => {
    const isWishedForSet = product?.isWished || '';
    setIsWished(isWishedForSet);
  });

  const orderSubmit = () => {
    fetch(`${IP_CONFIG}/orders`, {
      method: 'POST',
      headers: {
        authorization: localStorage?.getItem('token') || '',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        productOptionId,
        quantity,
      }),
    })
      .then(response => response.json())
      .then(result => alert(result.message));
  };

  const openModal = () => {
    if (accessToken === null) {
      alert('로그인하세요');
    } else if (selectedId === '') {
      alert('size를 선택하세요');
    } else {
      setModal(prev => !prev);
      document.body.style.overflow = 'hidden';
      window.scroll(0, 165);
      fetch(`${IP_CONFIG}/carts`, {
        method: 'POST',
        headers: {
          authorization: accessToken,
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          productOptionId: selectedId,
          quantity,
        }),
      }).then(response => response.json());
    }
  };

  const closeModal = () => {
    setModal(prev => !prev);
    document.body.style.overflow = 'unset';
  };

  const openShoesModal = () => {
    setShoesModal(prev => !prev);
    document.body.style.overflow = 'hidden';
  };
  const closeShoesModal = () => {
    setShoesModal(prev => !prev);
    document.body.style.overflow = 'unset';
  };

  const openReview = () => {
    setReviewOpen(prev => !prev);
  };

  const onIncrease = () => {
    let selectdSizesStock = 0;

    product?.productOptions.forEach(item => {
      if (Number(item.size) === Number(shooseSize)) {
        selectdSizesStock = item.stock;
        setProductOptionId(item.productOptionId);
      }
    });

    if (quantity < selectdSizesStock) {
      setquantity(prevquantity => prevquantity + 1);
    } else {
      alert('최대 구매 수량은 5개 입니다.');
    }
  };
  const onDecrease = () => {
    setquantity(prevquantity => prevquantity - 1);
  };

  const wishSubmit = () => {
    fetch(`${IP_CONFIG}/wishlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: accessToken || '',
      },
      body: JSON.stringify({
        productId,
      }),
    })
      .then(response => response.json())
      .then(result => {
        if (result.message === 'ALREADY_EXIST') {
          alert('이미 wishList에 있는 항목입니다.');
        } else setIsWished(true);
      });
  };

  return (
    <section className="itemDetail">
      {modal && <Modal closeModal={closeModal} />}
      <ShoesModal
        closeShoesModal={closeShoesModal}
        shoesModal={shoesModal}
        imageUrl={product?.imageUrl}
      />

      <article className="detailSection">
        <div className="detailContent">
          <DetailImgs
            imageUrl={product?.imageUrl}
            openShoesModal={openShoesModal}
          />
        </div>

        <div className="detailInfo">
          <div className="detailOption">
            <div
              className={`detailName ${
                product?.discountPrice === null ? 'price0' : ''
              }`}
            >
              <div className="namePrice">
                <div>{product?.brandName}</div>
                <div className="discounted">
                  {Number(product?.retailPrice).toLocaleString()}원
                </div>
              </div>
              <div>
                <div className="discountPrice">
                  {Number(product?.discountPrice).toLocaleString()}원
                </div>
              </div>
              <div className="discountPercent">
                {Math.floor(
                  (1 -
                    Number(product?.discountPrice) /
                      Number(product?.retailPrice)) *
                    100
                )}
                % off
              </div>
              <div className="shoesName">{product?.productName}</div>
            </div>
            <div>
              <ShoesColor getThumbnail={product?.getThumbnail} />
            </div>

            <div className="shoesSizes">
              <div className="sizetype">
                <div className="sizeSelect">사이즈 선택</div>
                <div className="sizeGuide">
                  <a href="#!">
                    <button type="button">사이즈 가이드</button>
                  </a>
                </div>
              </div>
              <ShoesSize
                footSize={product?.productOptions || []}
                setShooseSize={setShooseSize}
                setSelectedId={setSelectedId}
                setProductOptionId={setProductOptionId}
                product={product}
              />
            </div>
            <p>
              <button type="button" className="itemNotify">
                NOTIFY ME 입고 알림 신청
              </button>
            </p>
            <div className="itemCount">
              <span>수량</span>
              <span>
                <Counter
                  quantity={quantity}
                  onIncrease={onIncrease}
                  onDecrease={onDecrease}
                />
              </span>
            </div>
            <div className="itemPurchaseWrap">
              <button
                type="button"
                className="itemPurchase"
                onClick={orderSubmit}
              >
                바로구매
              </button>
              <div className="itemBasketWish">
                <button type="button" onClick={openModal} className="btn-modal">
                  장바구니
                </button>

                <button type="button" className="itemWish" onClick={wishSubmit}>
                  <div className="text">위시리스트</div>
                  {accessToken && (
                    <div className="heart">
                      {isWished === true ? '♥️' : '♡'}
                    </div>
                  )}
                </button>
              </div>
            </div>
            <div className="itemPickUp">
              <div className="itemService">
                매장 픽업 서비스가 한시적으로 중단됩니다.
              </div>
              <div>
                <button type="button" className="focus">
                  자세히 보기
                </button>
              </div>
            </div>
            <div className="shoesInfo">
              <p className="shoesDescription">{product?.description}</p>
              <div className="shoesStyle">
                <div>현재 컬러 : {product?.color}</div>
                <div>스타일 : {product?.styleCode}</div>
              </div>
              <div>
                <button type="button" className="shoesMoreInfo">
                  더 보기
                </button>
              </div>
            </div>
            <div className="itemSide">
              고객안내
              <img src="/image/open.png" alt="open" className="open" />
            </div>
            <div className="itemSideReview">
              <div className="review">
                리뷰
                <button type="button" onClick={openReview}>
                  <img src="/image/open.png" alt="open" className="open" />
                </button>
              </div>
              <div className="reviewContents">
                {reviewOpen && (
                  <Review
                    review={product?.review}
                    styleCode={product?.styleCode}
                  />
                )}
              </div>
            </div>

            <div className="itemSide">
              <div>배송</div>
              <div className="itemdetailRight">
                <div className="itemShip">일반배송/오늘도착</div>

                <img src="/image/open.png" alt="open" className="open" />
              </div>
            </div>
            <div className="itemSide">
              <span>반품/AS</span>
              <div className="itemdetailRight">
                <span className="itemShip">온라인 접수/매장 접수</span>
                <img src="/image/open.png" alt="open" className="open" />
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

export default ItemDetail;
