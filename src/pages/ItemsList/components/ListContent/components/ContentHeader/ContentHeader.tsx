import React from 'react';
import './contentHeader.scss';

interface PropsTypes {
  copyCurrentListUrl: () => void;
}

function ContentHeader({ copyCurrentListUrl }: PropsTypes) {
  return (
    <div className="contentHeader">
      <div className="contentHeaderContainer">
        <div className="headerContent">
          <div
            role="presentation"
            className="textContainer"
            onClick={copyCurrentListUrl}
          >
            현재 상품 리스트 링크 공유
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentHeader;
