import React from "react";
import { Product } from "./Product";
import { Amount } from "./Amount";

export interface ShopCart{
  carrinho: Product[],
  setCarrinho: React.Dispatch<React.SetStateAction<Product[]>>,
  quantidade: Amount,
  setQuantidade: React.Dispatch<React.SetStateAction<Amount>>
}