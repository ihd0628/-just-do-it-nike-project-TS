import React, { useState } from 'react';
import { CheckList } from '../../../../types/ItemListTypes';
import './filterBarCheckList.scss';
import FilterBarCheckInput from './components/FilterBarCheckInput';

interface PropsTypes {
  category: string;
  categoryCode: string;
  listArr: string[];
  checkList: CheckList;
  setCheckList: React.Dispatch<React.SetStateAction<CheckList>>;
}

function FilterBarCheckList({
  category,
  categoryCode,
  listArr,
  checkList,
  setCheckList,
}: PropsTypes) {
  const [isHide, setIsHide] = useState(false);

  const hideController = () => {
    setIsHide(prev => !prev);
  };

  return (
    <div className="category">
      <div className="categoryHeader">
        <div className="categoryText">{category}</div>
        {isHide === false ? (
          <img
            role="presentation"
            className="categoryIcon"
            src="./image/itemList/upArrow.png"
            alt="메뉴펼치기"
            onClick={hideController}
          />
        ) : (
          <img
            role="presentation"
            className="categoryIcon"
            src="./image/itemList/downArrow.png"
            alt="메뉴펼치기"
            onClick={hideController}
          />
        )}
      </div>
      <form
        className="checkList"
        style={isHide === false ? {} : { display: 'none' }}
      >
        {listArr.map((list, index) => {
          return (
            <FilterBarCheckInput
              key={list}
              categoryCode={categoryCode}
              list={list}
              checkList={checkList}
              setCheckList={setCheckList}
              index={index}
            />
          );
        })}
      </form>
    </div>
  );
}

export default FilterBarCheckList;
