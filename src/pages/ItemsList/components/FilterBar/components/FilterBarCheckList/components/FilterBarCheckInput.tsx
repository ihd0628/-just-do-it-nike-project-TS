import React, { useState, useEffect } from 'react';
import { CheckList } from '../../../../../types/ItemListTypes';

interface PropsTypes {
  categoryCode: string;
  list: string;
  checkList: CheckList;
  setCheckList: React.Dispatch<React.SetStateAction<CheckList>>;
  index: number;
}

function FilterBarCheckInput({
  categoryCode,
  list,
  checkList,
  setCheckList,
  index,
}: PropsTypes) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (checkList[categoryCode]?.includes(String(index + 1))) {
      setChecked(true);
    }
  }, [checkList]);

  const checkListManager = (event: React.ChangeEvent) => {
    const selectedElement = event.nativeEvent as any;
    const selectedCheckList = selectedElement.path[2].elements;
    const arrayForSubmit = [];
    for (let i = 0; i < selectedCheckList.length; i += 1) {
      if (selectedCheckList[i].checked === true)
        arrayForSubmit.push(String(i + 1));
    }
    const checklistForCopy = { ...checkList };
    checklistForCopy[categoryCode] = arrayForSubmit;
    setCheckList({ ...checklistForCopy });
    setChecked(prev => !prev);
  };

  return (
    <div className="list" key={list}>
      <input
        type="checkbox"
        checked={checked}
        id={list}
        name={list}
        onChange={checkListManager}
      />
      <label htmlFor={list}>{list}</label>
    </div>
  );
}

export default FilterBarCheckInput;
