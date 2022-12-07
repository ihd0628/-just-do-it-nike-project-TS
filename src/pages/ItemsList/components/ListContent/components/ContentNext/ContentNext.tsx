import React, { useRef, useState } from 'react';
import './contentNext.scss';

interface propsTypes {
  products: object[];
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
}

function ContentNext({ products, setOffset, setLimit }: propsTypes) {
  const offset = products.length !== undefined ? products.length : 0;
  const nextItemGetter = () => {
    setOffset(0);
    setLimit(offset + 6);
  };
  return (
    <button className="contentNext" onClick={nextItemGetter}>
      <div className="text">더 보기</div>
    </button>
  );
}

export default ContentNext;
