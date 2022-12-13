import React from 'react';
import { Product } from '../../types/ItemDetailTypes';
import DetailImgs from './components/DetailImgs';

interface PropsTypes {
  product: Product;
  openShoesModal: () => void;
}

function DetailContet({ product, openShoesModal }: PropsTypes) {
  return (
    <div className="detailContent">
      <DetailImgs
        imageURL={product?.imageURL}
        openShoesModal={openShoesModal}
      />
    </div>
  );
}

export default DetailContet;
