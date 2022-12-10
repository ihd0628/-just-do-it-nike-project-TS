import React from 'react';
import './contentList.scss';
import AdvertiseItem from './components/AdvertiseItem/AdvertiseItem';
import ContentItem from './components/ContentItem/ContentItem';
import { ProductTypes } from '../../../../types/ItemListTypes';
import CONTENTS_MOCK from './mockData/contentMock';

interface PropsTypes {
  products: Array<ProductTypes>;
  itemListCount: React.RefObject<HTMLDivElement>;
}
const productViewer = (productsInput: Array<ProductTypes>): JSX.Element[] => {
  return productsInput.map(
    ({
      id,
      thumbnail,
      productName,
      description,
      brandName,
      color,
      discountPrice,
      retailPrice,
    }) => {
      return (
        <ContentItem
          key={id}
          id={id}
          thumbnail={thumbnail}
          productName={productName}
          description={description}
          brandName={brandName}
          color={color}
          discountPrice={discountPrice}
          retailPrice={retailPrice}
        />
      );
    }
  );
};

function ContentList({ products, itemListCount }: PropsTypes) {
  return (
    <div className="contentItems">
      <div className="contentItemContainor" ref={itemListCount}>
        <div className="contentItem">
          <AdvertiseItem />
        </div>
        {products?.length === 0
          ? productViewer(CONTENTS_MOCK)
          : productViewer(products)}
      </div>
    </div>
  );
}

export default ContentList;
