import React from 'react';
import { ImageUrl } from '../../types/ItemDetailTypes';
import './ShoesImgs.scss';

interface PropsTypes {
  imageUrl: Array<ImageUrl>;
}

function ShoesImgs({ imageUrl }: PropsTypes) {
  return (
    <ul className="shoesImgs">
      {imageUrl?.map(imageInfo => (
        <li className="shoesProduct" key={imageInfo.product_id}>
          <div className="ShoesImgBox">
            <img
              src={imageInfo.imageUrl}
              alt="나이키"
              className="shoesBigImg"
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ShoesImgs;
