import React from 'react';
import './contentList.scss';
import { useSelector } from 'react-redux';
import AdvertiseItem from './components/AdvertiseItem/AdvertiseItem';
import ContentItem from './components/ContentItem/ContentItem';
import { RootState } from '../../../../../../store';

interface PropsTypes {
  itemListCount: React.RefObject<HTMLDivElement>;
}

function ContentList({ itemListCount }: PropsTypes) {
  const products = useSelector((state: RootState) => state.itemList);
  console.log('자식', products);

  return (
    <div className="contentItems">
      <div className="contentItemContainor" ref={itemListCount}>
        <div className="contentItem">
          <AdvertiseItem />
        </div>
        {products?.length === 0
          ? '로딩중~'
          : products?.map(
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
            )}
      </div>
    </div>
  );
}

export default ContentList;
