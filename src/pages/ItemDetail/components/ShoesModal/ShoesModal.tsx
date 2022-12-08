import React from 'react';
import './ShoesModal.scss';
import ShoesImgs from '../ShoesImgs/ShoesImgs';

interface PropsTypes {
  closeShoesModal: () => void;
  shoesModal: boolean;
  imageUrl: string;
}

function ShoesModal({ closeShoesModal, shoesModal, imageUrl }: PropsTypes) {
  return (
    <div>
      {shoesModal && (
        <div className="shoesModal">
          <div
            role="presentation"
            onClick={closeShoesModal}
            className="overlayWrap"
          >
            <ShoesImgs imageUrl={imageUrl} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ShoesModal;
