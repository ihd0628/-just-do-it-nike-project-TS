import React from 'react';
import { Product, ProductOption } from '../../types/ItemDetailTypes';
import SizeButton from './components/SizeButton';
import './ShoesSize.scss';

interface PropsTypes {
  footSize: Array<ProductOption>;
  setShooseSize: React.Dispatch<React.SetStateAction<string>>;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
  setProductOptionId: React.Dispatch<React.SetStateAction<string>>;
  product: Product;
}

function ShoesSize({
  footSize,
  setShooseSize,
  setSelectedId,
  setProductOptionId,
  product,
}: PropsTypes) {
  return (
    <div className="shoesSize">
      <ul className="shoesSizeWrap">
        {footSize?.map(data => (
          <SizeButton
            data={data}
            key={data.productOptionId}
            setShooseSize={setShooseSize}
            itemstock={data.stock}
            setSelectedId={setSelectedId}
            setProductOptionId={setProductOptionId}
            product={product}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoesSize;
