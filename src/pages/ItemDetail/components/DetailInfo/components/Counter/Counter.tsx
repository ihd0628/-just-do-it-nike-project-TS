import React from 'react';
import './Counter.scss';

interface PropsTypes {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

function Counter({ onDecrease, onIncrease, quantity }: PropsTypes) {
  return (
    <div className="counter">
      <h1 className="countStart">{quantity}</h1>
      <div className="count">
        <button
          type="button"
          className="countOn"
          onClick={onDecrease}
          disabled={quantity <= 1}
        >
          -
        </button>
        <button
          type="button"
          className="countOn"
          onClick={onIncrease}
          disabled={quantity >= 10}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default Counter;
