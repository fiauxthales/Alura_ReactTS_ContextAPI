import { Product } from "./Product";

export interface ShopCart{
  carrinho: Product[],
  setCarrinho: React.Dispatch<React.SetStateAction<Product[]>>,
}