import type { Dispatch, SetStateAction } from "react";

export interface Product {
  name: string;
  checked: boolean;
}

export interface InputFormProps {
  setProducts: Dispatch<SetStateAction<Product[]>>;
  setProductToAdd: Dispatch<SetStateAction<string>>;
  products: Product[];
  productToAdd: string;
}

export interface ShoppingListProps {
  setProducts: Dispatch<SetStateAction<Product[]>>;
  products: Product[];
  productToAdd: string;
}
