import React from 'react';
import ContentHeader from './components/ContentHeader/ContentHeader';
import ContentNext from './components/ContentNext/ContentNext';
import ContentList from './components/ContentList/ContentList';
import { ProductTypes } from '../ItemListTypes';
import './listContent.scss';

interface PropsTypes {
  products: Array<ProductTypes>;
  filterHider: boolean;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  itemListCount: React.RefObject<HTMLDivElement>;
}

function ListContent({
  products,
  filterHider,
  setOffset,
  setLimit,
  itemListCount,
}: PropsTypes) {
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
