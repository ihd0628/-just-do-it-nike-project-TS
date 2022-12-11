import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IP_CONFIG } from '../../../config';
// import { WISH_DATA } from '../../../config';

interface PropsTypes {
  productId: string;
  thumbnail: string;
  name: string;
  price: string;
}

function WishItem({ productId, thumbnail, name, price }: PropsTypes) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const moveItemDetail = () => {
    navigate(`/item-detail/${productId}`, { state: { productId } });
  };
  const handleDeleteCheck = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    try {
      if (window.confirm('삭제 하시겠습니까?')) {
        await fetch(`${IP_CONFIG}/wishlist/${productId}`, {
          method: 'DELETE',
          headers: {
            authorization: token || '',
          },
        })
          .then(response => response.json())
          .then(result => {
            if (result.message === 'delete complete') {
              const eventElement = event.nativeEvent as any;
              eventElement.path[2].innerHTML = '';
            }
          });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div key={productId} className="wishItem">
      <button
        type="button"
        className="deleteButton"
        onClick={handleDeleteCheck}
        title={productId}
      >
        <i className="fa-solid fa-x deleteIcon" />
      </button>
      <div className="wishItemBox">
        <img
          role="presentation"
          src={thumbnail}
          alt="위시리스트사진"
          className="wishImg"
          onClick={moveItemDetail}
        />
        <p className="wishName">{name}</p>
        <p className="wishPrice">{Number(price).toLocaleString()}원</p>
        <p role="presentation" onClick={moveItemDetail} className="wishMove">
          상세페이지로 이동
        </p>
      </div>
    </div>
  );
}

export default WishItem;
