import React from 'react';
import './ShoesImgs.scss';

interface PropsTypes {
  imageUrl: Array<string>;
}

function ShoesImgs({ imageUrl }: PropsTypes) {
  return (
    <ul className="shoesImgs">
      {imageUrl?.map(e => (
        <li className="shoesProduct" key={e}>
          <div className="ShoesImgBox">
            <img src={e} alt="나이키" className="shoesBigImg" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ShoesImgs;
