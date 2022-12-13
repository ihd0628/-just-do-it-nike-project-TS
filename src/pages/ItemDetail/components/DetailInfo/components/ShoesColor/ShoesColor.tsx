import React from 'react';
import { ThumbailInfo } from '../../../../types/ItemDetailTypes';

interface PropsTyeps {
  getThumbnail: Array<ThumbailInfo>;
}

function ShoesColor({ getThumbnail }: PropsTyeps) {
  return (
    <ul className="shoesColor">
      {getThumbnail?.map(e => (
        <li className="shoesColor" key={e.id}>
          <button type="button">
            <img src={e.thumbnail} alt="나이키" className="shoesColorImg" />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ShoesColor;
