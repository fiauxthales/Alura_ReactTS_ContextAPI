import { Product } from 'common/types/Product';
import { ShopCart } from 'common/types/ShopCart';
import {createContext, useContext, useState} from 'react';

export const CarrinhoContext = createContext<ShopCart|null>(null);
CarrinhoContext.displayName = "Carrinho";

export const CarrinhoProvider = ({children}: {children: JSX.Element | JSX.Element[]}) => {
  const[carrinho, setCarrinho] = useState<Array<Product>>([]);
  return(
    <CarrinhoContext.Provider value={{carrinho, setCarrinho}}>
      {children}
    </CarrinhoContext.Provider>
  )
}

export const useCarrinhoContext = () => {
  const shopCart = useContext(CarrinhoContext);
  if(!shopCart) return null;
  const {carrinho, setCarrinho} = shopCart;

  function adicionarProduto(novoProduto: Product){
    const temProduto = carrinho.some(itemDoCarrinho => itemDoCarrinho.id === novoProduto.id);
    if(!temProduto){
      novoProduto.quantidade = 1;
      return setCarrinho(carrinhoAnterior => [...carrinhoAnterior, novoProduto]);
    }
    setCarrinho(carrinhoAnterior => carrinhoAnterior.map(itemDoCarrinho => {
      if(itemDoCarrinho.id === novoProduto.id) itemDoCarrinho.quantidade! += 1;
      return itemDoCarrinho;
    }))

  }
  return {carrinho, setCarrinho, adicionarProduto};
}