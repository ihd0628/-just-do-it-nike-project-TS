import React from 'react';
import { Product } from '../../types/ItemDetailTypes';
import DetailImgs from './components/DetailImgs';

interface PropsTypes {
  product: Product;
  shoesModalController: () => void;
}

function DetailContet({ product, shoesModalController }: PropsTypes) {
  return (
    <div className="detailContent">
      <DetailImgs
        imageURL={product?.imageURL}
        shoesModalController={shoesModalController}
      />
    </div>
  );
}

export default DetailContet;
