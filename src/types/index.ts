export interface Product {
  _id: string;
  name: string;
  description: string;
  img: string[];
  categories: string[];
  sizes: { [key: string]: { stock: number } };
  price: number;
  color: string[];
  inStock: boolean;
  bestSeller: boolean;
  newProduct: boolean;
  onSale: boolean;
  salePercent: number;
}
