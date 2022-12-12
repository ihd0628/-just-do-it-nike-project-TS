export interface ImageUrl {
  imageUrl: string;
  product_id: number;
}
export interface ThumbailInfo {
  id: string;
  thumbnail: string;
}
export interface ProductOption {
  size: string;
  stock: number;
  productOptionId: number;
}
export interface ReviewInfo {
  starScore: number;
  fullName: string;
  createdAt: string;
  content: string;
}

export interface Product {
  isWished: boolean;
  productOptions: Array<ProductOption>;
  imageUrl: Array<ImageUrl>;
  brandName: string;
  color: string;
  review: Array<ReviewInfo>;
  getThumbnail: Array<ThumbailInfo>;
  description: string;
  cartId?: number;
  userId?: number;
  styleCode: string;
  quantity?: number;
  productOptionId?: number;
  productId?: number;
  productName: string;
  sizeId?: number;
  size?: string;
  stock?: number;
  retailPrice: string;
  discountPrice: string;
  thumbnail: string;
}

export const productSample: Product = {
  isWished: false,
  productOptions: [],
  imageUrl: [],
  discountPrice: 'string',
  retailPrice: 'string',
  brandName: 'string',
  color: 'string',
  styleCode: 'string',
  review: [],
  productName: 'string',
  getThumbnail: [],
  description: 'string',
  cartId: 0,
  userId: 0,
  quantity: 0,
  productOptionId: 0,
  productId: 0,
  sizeId: 0,
  size: 'string',
  stock: 0,
  thumbnail: 'string',
};
