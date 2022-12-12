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

export interface CheckList {
  [key: string]: string[];
}
