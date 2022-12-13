import React from 'react';
import './ShoesModal.scss';
import ShoesImgs from '../DetailInfo/components/ShoesImgs/ShoesImgs';

interface PropsTypes {
  shoesModal: boolean;
  imageURL: Array<string>;
  shoesModalController: () => void;
}

function ShoesModal({
  shoesModal,
  imageURL,
  shoesModalController,
}: PropsTypes) {
  return (
    <div>
      {shoesModal && (
        <div className="shoesModal">
          <div
            role="presentation"
            onClick={shoesModalController}
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
