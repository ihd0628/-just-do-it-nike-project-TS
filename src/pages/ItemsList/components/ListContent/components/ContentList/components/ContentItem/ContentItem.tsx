import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductTypes } from '../../../../../../types/ItemListTypes';

const CONSTANT_TEXT = {
  WON: '원',
};

function ContentItem({
  id,
  thumbnail,
  productName,
  description,
  brandName,
  color,
  discountPrice,
  retailPrice,
}: ProductTypes) {
  const navigate = useNavigate();

  const goToItemDetail = () => {
    navigate(`/item-detail/${id}`);
  };

  return (
    <div className="contentItem" key={id}>
      <div
        role="presentation"
        className="itemImg"
        style={{ backgroundColor: `white` }}
        onClick={goToItemDetail}
      >
        <div className="itemDecription">
          <p>{description}</p>
        </div>
        <img src={thumbnail} alt={productName} />
      </div>
      <div className="itemDetails">
        <div className="itemDetailLeft">
          <div className="productName detail">{productName}</div>
          <div className="brandName detail">{brandName}</div>
          <div className="color detail">{color}</div>
        </div>
        <div className="itemDetailRight">
          {discountPrice !== null ? (
            <>
              <div className="discountRatio detail">
                {Math.floor(
                  (1 - Number(discountPrice) / Number(retailPrice)) * 100
                )}
                %
              </div>
              <div className="price detail">
                <div className="discountPrice detail">
                  {Number(discountPrice).toLocaleString() + CONSTANT_TEXT.WON}
                </div>
                <div className="retailPrice detail">
                  {Number(retailPrice).toLocaleString() + CONSTANT_TEXT.WON}
                </div>
              </div>
            </>
          ) : (
            <div className="price detail">
              <div className="discountPrice detail">
                {Number(retailPrice).toLocaleString()}원
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContentItem;
