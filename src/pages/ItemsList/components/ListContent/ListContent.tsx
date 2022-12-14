import React from 'react';
import ContentHeader from './components/ContentHeader/ContentHeader';
import ContentNext from './components/ContentNext/ContentNext';
import ContentList from './components/ContentList/ContentList';
import './listContent.scss';

interface PropsTypes {
  filterHider: boolean;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  itemListCount: React.RefObject<HTMLDivElement>;
}

function ListContent({
  filterHider,
  setOffset,
  setLimit,
  itemListCount,
}: PropsTypes) {
  return (
    <div className="listContent" style={!filterHider ? { marginLeft: 0 } : {}}>
      <ContentHeader />
      <ContentList itemListCount={itemListCount} />

      <ContentNext setOffset={setOffset} setLimit={setLimit} />
    </div>
  );
}

export default ListContent;
