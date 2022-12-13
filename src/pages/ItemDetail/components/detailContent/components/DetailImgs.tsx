import React from 'react';
import './DetailImgs.scss';

interface PropsTypes {
  imageURL: Array<string>;
  shoesModalController: () => void;
}

function DetailImgs({ imageURL, shoesModalController }: PropsTypes) {
  return (
    <ul className="detailImgs">
      {imageURL?.map(imageInfo => (
        <li className="detailProduct" key={imageInfo}>
          <div className="detailImg">
            <img
              role="presentation"
              src={imageInfo}
              alt="나이키"
              className="shoesImg"
              onClick={shoesModalController}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default DetailImgs;
