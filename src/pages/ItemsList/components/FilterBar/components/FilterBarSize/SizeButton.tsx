import React, { useEffect, useState } from 'react';

interface PropsTypes {
  size: number;
  selectedSize: string[];
  setSelectedSize: React.Dispatch<React.SetStateAction<string[]>>;
}

function SizeButton({ size, selectedSize, setSelectedSize }: PropsTypes) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (selectedSize.indexOf(String(size)) !== -1) setIsChecked(true);
  }, [selectedSize]);

  const sizeSelector = () => {
    let sizeArr = [...selectedSize];

    if (sizeArr.indexOf(String(size)) === -1) sizeArr.push(String(size));
    else sizeArr = sizeArr.filter(element => element !== String(size));

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
