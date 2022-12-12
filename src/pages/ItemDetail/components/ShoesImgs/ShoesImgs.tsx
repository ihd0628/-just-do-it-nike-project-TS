import React from 'react';
import './ShoesImgs.scss';

interface PropsTypes {
  imageURL: Array<string>;
}

function ShoesImgs({ imageURL }: PropsTypes) {
  return (
    <ul className="shoesImgs">
      {imageURL?.map(imageInfo => (
        <li className="shoesProduct" key={imageInfo}>
          <div className="ShoesImgBox">
            <img src={imageInfo} alt="나이키" className="shoesBigImg" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ShoesImgs;
