import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = [
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
    setItemList: (state, action) => {
      return action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    itemList: itemList.reducer,
  },
});

export const { setItemList } = itemList.actions;

export type RootState = ReturnType<typeof store.getState>;
export default store;
