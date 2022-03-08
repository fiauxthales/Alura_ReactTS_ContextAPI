import React from "react";
import { Product } from "./Product";

export interface ShopCart{
  carrinho: Product[],
  setCarrinho: React.Dispatch<React.SetStateAction<Product[]>>,
  quantidadeProdutos: number,
  setQuantidadeProdutos: React.Dispatch<React.SetStateAction<number>>
}