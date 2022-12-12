export interface ThumbailInfo {
  id: string;
  thumbnail: string;
}
export interface ProductOption {
  size: string;
  stock: number;
  productOptionId: string;
}
export interface ReviewInfo {
  id: number;
  starScore: number;
  fullName: string;
  createdAt: string;
  content: string;
}

export interface Product {
  isWished: boolean;
  productOptions: Array<ProductOption>;
  imageURL: Array<string>;
  brandName: string;
  color: string;
  review: Array<ReviewInfo>;
  getThumbnail: Array<ThumbailInfo>;
  description: string;
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
