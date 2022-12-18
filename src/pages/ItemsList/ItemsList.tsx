import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { IP_CONFIG } from '../../config';
import FilterBar from './components/FilterBar/FilterBar';
import ListContent from './components/ListContent/ListContent';
import ListHeader from './components/listHeader/ListHeader';

import './itemList.scss';
import { CheckList } from './types/ItemListTypes';
import { setItemList } from '../../store';
import {
  getFilterOptionsFromQueryList,
  getKeyByValue,
  GetQueryString,
} from './method/itemListMethod';

function ItemList() {
  const [sortStandard, setSortStandard] = useState<string>('신상품순');
  const [filterHider, setFilterHider] = useState<boolean>(true);
  const [checkList, setCheckList] = useState<CheckList>({});
  const [selectedColor, setSelectedColor] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [searchParams, setSearchParams] = useSearchParams();

  const itemListCount = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  console.log('부모');
  useEffect(() => {
    const filterOptns = getFilterOptionsFromQueryList(searchParams);
    if (filterOptns.size) setSelectedSize([...filterOptns.size]);
    if (filterOptns.color) setSelectedColor([...filterOptns.color]);
    if (filterOptns.checkList) setCheckList({ ...filterOptns.checkList });
    if (filterOptns.offset[0]) setOffset(filterOptns.offset[0]);
    if (filterOptns.limit[0]) setLimit(filterOptns.limit[0]);
    if (filterOptns.sort[0]) {
      setSortStandard(getKeyByValue(filterOptns.sort[0] as string));
    }
    return () => {
      dispatch(setItemList([]));
    };
  }, []);

  useEffect(() => {
    const { queryString } = new GetQueryString(
      selectedSize,
      selectedColor,
      checkList as any,
      offset,
      limit,
      sortStandard
    );

    fetch(`${IP_CONFIG}/products?${queryString}`)
      .then(response => response.json())
      .then(({ list }) => {
        console.log('통신');
        setSearchParams(queryString);
        dispatch(setItemList(list));
      })
      .catch(error => console.log(error));
  }, [offset, limit, checkList, selectedColor, selectedSize, sortStandard]);

  const copyCurrentListUrl = () => {
    const { queryString } = new GetQueryString(
      selectedSize,
      selectedColor,
      checkList as any,
      offset,
      limit,
      sortStandard
    );
    navigator.clipboard
      .writeText(`localhost:3000/item-list?${queryString}`)
      .then(() => {
        alert('복사되었지롱');
      });
  };
  return (
    <section className="itemList">
      <ListHeader
        filterHider={filterHider}
        setFilterHider={setFilterHider}
        sortStandard={sortStandard}
        setSortStandard={setSortStandard}
      />
      <div className="itemListMain">
        <FilterBar
          filterHider={filterHider}
          checkList={checkList}
          setCheckList={setCheckList}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
        />

        <ListContent
          filterHider={filterHider}
          setOffset={setOffset}
          setLimit={setLimit}
          itemListCount={itemListCount}
          copyCurrentListUrl={copyCurrentListUrl}
        />
      </div>
    </section>
  );
}

export default ItemList;
