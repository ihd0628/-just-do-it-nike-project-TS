import React, { useState } from 'react';
import './SizeButton.scss';

interface ProductOption {
  size: string;
  stock: number;
  productOptionId: string;
}

interface Product {
  isWished: boolean;
  productOptions: Array<ProductOption>;
  discountPrice: string;
  retailPrice: string;
  brandName: string;
  color: string;
  styleCode: string;
  review: string;
  productName: string;
  getThumbnail: string;
  description: string;
}

interface PropsTypes {
  data: ProductOption;
  setShooseSize: React.Dispatch<React.SetStateAction<string>>;
  itemstock: number;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
  setProductOptionId: React.Dispatch<React.SetStateAction<string>>;
  product: Product;
}

function SizeButton({
  data,
  setShooseSize,
  itemstock,
  setSelectedId,
  setProductOptionId,
  product,
}: PropsTypes) {
  const { size } = data;
  const [button, setButton] = useState(false);

  const pushButton = (event: React.MouseEvent<HTMLInputElement>) => {
    const selectedElement = event.target as HTMLInputElement;
    setShooseSize(selectedElement.id);
    setButton(!button);
    setSelectedId(selectedElement.value);
    product.productOptions.forEach(item => {
      if (Number(item.size) === Number(selectedElement.id)) {
        setProductOptionId(item.productOptionId);
      }
    });
  };

  return (
    <li>
      <input
        name="shoesSize"
        type="radio"
        className="sizeButton"
        onClick={pushButton}
        id={size}
        disabled={itemstock === 0}
        value={data.productOptionId}
      />
      <label htmlFor={size}>{data.size}</label>
    </li>
  );
}

export default SizeButton;
