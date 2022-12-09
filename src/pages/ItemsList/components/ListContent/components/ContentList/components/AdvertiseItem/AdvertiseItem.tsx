import React from 'react';

function AdvertiseItem() {
  return (
    <div className="video">
      <video muted autoPlay loop width="100%">
        <source src="/videos/nikeRun33.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

export default AdvertiseItem;
