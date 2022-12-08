import React, { useState } from 'react';
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

  const colorSelector = (event: React.MouseEvent<HTMLDivElement>) => {
    const eventElement = event.target as HTMLDivElement;
    const color = eventElement.title;
    let colorArr = [...selectedColor];

    if (colorArr.indexOf(color) === -1) colorArr.push(color);
    if (colorArr.indexOf(color) !== -1)
      colorArr = colorArr.filter(element => element !== color);

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
