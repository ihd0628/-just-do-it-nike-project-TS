import React from 'react';
import { ImageUrl } from '../../types/ItemDetailTypes';
import './DetailImgs.scss';

interface PropsTypes {
  imageUrl: Array<ImageUrl>;
  openShoesModal: () => void;
}

function DetailImgs({ imageUrl, openShoesModal }: PropsTypes) {
  return (
    <ul className="detailImgs">
      {imageUrl?.map(imageInfo => (
        <li className="detailProduct" key={imageInfo.product_id}>
          <div className="detailImg">
            <img
              role="presentation"
              src={imageInfo.imageUrl}
              alt="나이키"
              className="shoesImg"
              onClick={openShoesModal}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default DetailImgs;
