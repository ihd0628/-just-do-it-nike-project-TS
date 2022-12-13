import React, { useEffect, useState } from 'react';
import './ItemDetail.scss';
import { useParams } from 'react-router-dom';
import Modal from './components/Modal/Modal';
import ShoesModal from './components/ShoesModal/ShoesModal';
import { IP_CONFIG } from '../../config';
import { Product, productSample } from './types/ItemDetailTypes';
import DetailContet from './components/DetailContent/DetailContet';
// import PRODUCT_MOCK from './mockData/productMock';
import DetailInfo from './components/DetailInfo/DetailInfo';

function ItemDetail() {
  const [modal, setModal] = useState(false);
  const [product, setProduct] = useState<Product>(productSample);
  const [isWished, setIsWished] = useState<boolean>(false);
  const [shoesModal, setShoesModal] = useState(false);
  const [accessToken] = useState(localStorage.getItem('token') || '');

  const { productId = '' } = useParams();

  useEffect(() => {
    // setProduct(PRODUCT_MOCK[0]);
    fetch(`${IP_CONFIG}/product/${productId}`, {
      method: 'GET',
      headers: {
        authorization: localStorage?.getItem('token') || '',
      },
    })
      .then(response => response.json())
      .then(data => {
        setIsWished(data.isWished);
        setProduct(data);
      });
  }, []);

  useEffect(() => {
    const isWishedForSet = product?.isWished;
    setIsWished(isWishedForSet);
  }, []);

  const openShoesModal = () => {
    setShoesModal(prev => !prev);
    document.body.style.overflow = 'hidden';
  };
  const closeShoesModal = () => {
    setShoesModal(prev => !prev);
    document.body.style.overflow = 'unset';
  };

  const closeModal = () => {
    setModal(prev => !prev);
    document.body.style.overflow = 'unset';
  };

  return (
    <section className="itemDetail">
      {modal && <Modal closeModal={closeModal} />}
      <ShoesModal
        closeShoesModal={closeShoesModal}
        shoesModal={shoesModal}
        imageURL={product?.imageURL}
      />

      <article className="detailSection">
        <DetailContet product={product} openShoesModal={openShoesModal} />
        <DetailInfo
          product={product}
          accessToken={accessToken}
          isWished={isWished}
          setIsWished={setIsWished}
          productId={productId}
          setModal={setModal}
        />
      </article>
    </section>
  );
}

export default ItemDetail;
