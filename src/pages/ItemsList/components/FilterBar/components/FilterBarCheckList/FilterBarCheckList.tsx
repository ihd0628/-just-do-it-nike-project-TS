import React, { useState } from 'react';
import './filterBarCheckList.scss';

interface CheckList {
  [key: string]: number[];
}

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

  const checkListManager = (event: React.MouseEvent) => {
    const selectedElement = event.nativeEvent as any;
    const selectedCheckList = selectedElement.path[2].elements;
    const arrayForSubmit = [];
    for (let i = 0; i < selectedCheckList.length; i += 1) {
      if (selectedCheckList[i].checked === true) arrayForSubmit.push(i + 1);
    }
    const checklistForCopy = { ...checkList };
    checklistForCopy[categoryCode] = arrayForSubmit;
    setCheckList({ ...checklistForCopy });
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
        {listArr.map(list => {
          return (
            <div className="list" key={list}>
              <input
                type="checkbox"
                id={list}
                name={list}
                onClick={checkListManager}
              />
              <label htmlFor={list}>{list}</label>
            </div>
          );
        })}
      </form>
    </div>
  );
}

export default FilterBarCheckList;
