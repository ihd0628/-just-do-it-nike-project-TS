import React, { useState } from 'react';

interface PropsTypes {
  size: number;
  selectedSize: string[];
  setSelectedSize: React.Dispatch<React.SetStateAction<string[]>>;
}

function SizeButton({ size, selectedSize, setSelectedSize }: PropsTypes) {
  const [isChecked, setIsChecked] = useState(false);

  const sizeSelector = (event: React.MouseEvent<HTMLDivElement>) => {
    const targetElemet = event.target as HTMLDivElement;
    const newSize = targetElemet.title;
    let sizeArr = [...selectedSize];

    if (sizeArr.indexOf(newSize) === -1) sizeArr.push(newSize);
    else sizeArr = sizeArr.filter(element => element !== newSize);

    setIsChecked(prev => !prev);
    setSelectedSize(sizeArr);
  };
  return (
    <div
      role="presentation"
      className={`sizeNumber ${isChecked ? 'selected' : ''}`}
      onClick={sizeSelector}
      title={String(size)}
    >
      <div title={String(size)}>{size}</div>
    </div>
  );
}

export default SizeButton;
