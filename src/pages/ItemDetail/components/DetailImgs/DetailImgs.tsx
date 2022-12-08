import React from 'react';
import './DetailImgs.scss';

interface PropsTypes {
  imageUrl: string[];
  openShoesModal: () => void;
}

function DetailImgs({ imageUrl, openShoesModal }: PropsTypes) {
  return (
    <ul className="detailImgs">
      {imageUrl?.map(url => (
        <li className="detailProduct" key={url}>
          <div className="detailImg">
            <img
              role="presentation"
              src={url}
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
