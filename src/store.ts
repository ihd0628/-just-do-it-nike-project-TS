import { configureStore, createSlice } from '@reduxjs/toolkit';

export interface ProductTypes {
  id: number;
  styleCode?: string;
  thumbnail: string;
  productName: string;
  description: string;
  brandName: string;
  color: string;
  discountPrice: number;
  retailPrice: number;
  releaseDate?: string;
}

const initialState: Array<ProductTypes> = [
  {
    id: 0,
    styleCode: 'string',
    thumbnail: 'string',
    productName: 'string',
    description: 'string',
    brandName: 'string',
    color: 'string',
    discountPrice: 0,
    retailPrice: 0,
    releaseDate: 'string',
  },
];

const itemList = createSlice({
  name: 'itemListReducer',
  initialState,
  reducers: {
    set: (state, action) => {
      return action.payload;
    },
  },
});

const store = configureStore({ reducer: itemList.reducer });
console.log(itemList.actions);

export const { set } = itemList.actions;

export default store;
