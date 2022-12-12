import React from 'react';
import './ShoesModal.scss';
import ShoesImgs from '../ShoesImgs/ShoesImgs';

interface PropsTypes {
  closeShoesModal: () => void;
  shoesModal: boolean;
  imageURL: Array<string>;
}

function ShoesModal({ closeShoesModal, shoesModal, imageURL }: PropsTypes) {
  return (
    <div>
      {shoesModal && (
        <div className="shoesModal">
          <div
            role="presentation"
            onClick={closeShoesModal}
            className="overlayWrap"
          >
            <ShoesImgs imageURL={imageURL} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ShoesModal;
