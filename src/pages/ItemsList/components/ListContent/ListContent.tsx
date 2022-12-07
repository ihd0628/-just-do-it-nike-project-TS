import React from 'react';
import ContentHeader from './components/ContentHeader/ContentHeader';
import ContentNext from './components/ContentNext/ContentNext.jsx';
import ContentList from './components/ContentList/ContentList';
import './listContent.scss';

interface propsTypes {
  products: object[];
  setProducts: React.Dispatch<React.SetStateAction<object[]>>;
  filterHider: boolean;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  itemListCount: React.RefObject<HTMLDivElement>;
}

function ListContent({
  products,
  setProducts,
  filterHider,
  setOffset,
  setLimit,
  itemListCount,
}: propsTypes) {
  return (
    <div className="listContent" style={!filterHider ? { marginLeft: 0 } : {}}>
      <ContentHeader />
      <ContentList products={products} itemListCount={itemListCount} />

      <ContentNext
        products={products}
        setOffset={setOffset}
        setLimit={setLimit}
      />
    </div>
  );
}

export default ListContent;
