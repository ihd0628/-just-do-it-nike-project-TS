import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import WISH from './WISH_DATA';
import './WishList.scss';
import WishItem from './components/WishItem';
import { IP_CONFIG } from '../../config';

function WishList() {
  const [addWish, setAddWish] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch(`${IP_CONFIG}/wishlist`, {
      method: 'GET',
      headers: {
        authorization: token || '',
      },
    })
      .then(response => response.json())
      .then(data => {
        setAddWish(data);
      });
  }, []);

  return (
    <div className="wishList">
      <h1 className="wishTitle">위시리스트</h1>
      <div className="wishContainer">
        <div className="wishMenu">
          {WISH.WISH_MENU_DATA.map(({ name, menuId }) => {
            return (
              <Link to="/item-list" key={menuId} className="menuList">
                {name}
              </Link>
            );
          })}
        </div>
        <div className="wishListContainer">
          {addWish.map(({ productId, thumbnail, name, price }) => {
            return (
              <WishItem
                key={productId}
                productId={productId}
                thumbnail={thumbnail}
                name={name}
                price={price}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default WishList;
