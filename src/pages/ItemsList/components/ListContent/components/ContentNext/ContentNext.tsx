import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../store';
import './contentNext.scss';

interface PropsTypes {
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
}

function ContentNext({ setOffset, setLimit }: PropsTypes) {
  const products = useSelector((state: RootState) => state.itemList);

  const offset = products.length !== undefined ? products.length : 0;
  const nextItemGetter = () => {
    setOffset(0);
    setLimit(offset + 6);
  };
  return (
    <button type="button" className="contentNext" onClick={nextItemGetter}>
      <div className="text">더 보기</div>
    </button>
  );
}

export default ContentNext;
