import React, { useEffect, useState } from 'react';
import './color.scss';

interface PropsTypes {
  name: string;
  code: string;
  colorNumber: string;
  selectedColor: string[];
  setSelectedColor: React.Dispatch<React.SetStateAction<string[]>>;
}

function Color({
  name,
  code,
  colorNumber,
  selectedColor,
  setSelectedColor,
}: PropsTypes) {
  const [colorCheck, setColorCheck] = useState(false);

  useEffect(() => {
    if (selectedColor.indexOf(String(colorNumber)) !== -1) setColorCheck(true);
  }, [selectedColor]);

  const colorSelector = () => {
    let colorArr = [...selectedColor];
    if (colorArr.indexOf(colorNumber) === -1) {
      colorArr.push(colorNumber);
    } else {
      colorArr = colorArr.filter(element => element !== colorNumber);
    }

    setColorCheck(prev => !prev);
    setSelectedColor(colorArr);
  };

  return (
    <div className="color">
      <div
        role="presentation"
        className="colorCircle"
        style={{ backgroundColor: `${code}` }}
        title={colorNumber}
        onClick={colorSelector}
      >
        {colorCheck && (
          <p className="colorCheck" title={colorNumber}>
            ✓
          </p>
        )}
      </div>
      <div className="colorName">{name}</div>
    </div>
  );
}

export default Color;
