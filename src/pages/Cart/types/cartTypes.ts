export interface CartItemTypes {
  cartId: number;
  userId: number;
  styleCode: string;
  quantity: number;
  productOptionId: number;
  productId: number;
  productName: string;
  sizeId: number;
  size: string;
  stock: number;
  retailPrice: string;
  discountPrice: string;
  thumbnail: string;
}

export interface CartOpt {
  brandId: number;
  brandName: string;
  images: Array<string>;
  productOptions: Array<{
    productOptionId: number;
    size: string;
    stock: number;
  }>;
}
