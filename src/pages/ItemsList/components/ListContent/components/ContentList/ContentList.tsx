import React from 'react';
import './contentList.scss';
import { useSelector } from 'react-redux';
import AdvertiseItem from './components/AdvertiseItem/AdvertiseItem';
import ContentItem from './components/ContentItem/ContentItem';
import { ProductTypes } from '../../../../types/ItemListTypes';
import CONTENTS_MOCK from './mockData/contentMock';
import { RootState } from '../../../../../../store';

interface PropsTypes {
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

function ContentList({ itemListCount }: PropsTypes) {
  const products = useSelector((state: RootState) => state);
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
