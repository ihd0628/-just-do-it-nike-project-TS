import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IP_CONFIG } from '../../config';
import FilterBar from './components/FilterBar/FilterBar';
import ListContent from './components/ListContent/ListContent';
import ListHeader from './components/listHeader/ListHeader';

import './itemList.scss';
import { CheckList, ProductTypes } from './types/ItemListTypes';

const {
  GetQueryString,
  getFilterOptionsFromQueryList,
} = require('./method/itemListMethod');

function ItemList() {
  const [products, setProducts] = useState<Array<ProductTypes>>([]);
  const [sortStandard, setSortStandard] = useState<string>('신상품순');
  const [filterHider, setFilterHider] = useState<boolean>(true);
  const [checkList, setCheckList] = useState<CheckList>({});
  const [selectedColor, setSelectedColor] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [searchParams, setSearchParams] = useSearchParams();

  const itemListCount = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const filterOptions = getFilterOptionsFromQueryList(searchParams);
    if (filterOptions.limit.length !== 0) {
      setSelectedSize([...filterOptions.size]);
      setSelectedColor([...filterOptions.color]);
      setCheckList({ ...filterOptions.checkList });
      setOffset(filterOptions.offset[0]);
      setLimit(filterOptions.limit[0]);
      setSortStandard(filterOptions.sort[0]);
    }
  }, []);

  useEffect(() => {
    const { queryString } = new GetQueryString(
      selectedSize,
      selectedColor,
      checkList,
      offset,
      limit,
      sortStandard
    );
    setSearchParams(queryString);
    try {
      fetch(`${IP_CONFIG}/products?${queryString}`)
        .then(response => response.json())
        .then(result => {
          setProducts(result.list);
        });
    } catch (e: any) {
      console.log(e);
    }
  }, [offset, limit, checkList, selectedColor, selectedSize, sortStandard]);

  return (
    <section className="itemList">
      <ListHeader
        filterHider={filterHider}
        setFilterHider={setFilterHider}
        sortStandard={sortStandard}
        setSortStandard={setSortStandard}
        products={products}
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
          products={products}
          filterHider={filterHider}
          setOffset={setOffset}
          setLimit={setLimit}
          itemListCount={itemListCount}
        />
      </div>
    </section>
  );
}

export default ItemList;
