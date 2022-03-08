import { Product } from 'common/types/Product';
import { ShopCart } from 'common/types/ShopCart';
import {createContext, useContext, useEffect, useState} from 'react';

export const CarrinhoContext = createContext<ShopCart|null>(null);
CarrinhoContext.displayName = "Carrinho";

export const CarrinhoProvider = ({children}: {children: JSX.Element | JSX.Element[]}) => {
  const[carrinho, setCarrinho] = useState<Array<Product>>([]);
  const[quantidadeProdutos, setQuantidadeProdutos] = useState<number>(0);
  return(
    <CarrinhoContext.Provider 
      value={{carrinho, setCarrinho, quantidadeProdutos, setQuantidadeProdutos}}>
      {children}
    </CarrinhoContext.Provider>
  )
}

export const useCarrinhoContext = () => {
  const shopCart = useContext(CarrinhoContext);

  useEffect(()=> {
    const novaQuantidade = shopCart?.carrinho.reduce((contador, produto)=> contador + produto.quantidade!, 0);
    shopCart?.setQuantidadeProdutos(novaQuantidade!);
}, [shopCart]);


  if(!shopCart) return null;
  const {carrinho, setCarrinho, quantidadeProdutos, setQuantidadeProdutos} = shopCart;


  function mudarQuantidade(id: string, quantidade: number){
    return carrinho.map(itemDoCarrinho => {
      if(itemDoCarrinho.id === id) itemDoCarrinho.quantidade! += quantidade;
      return itemDoCarrinho;
    })
  }

  function adicionarProduto(novoProduto: Product){
    const temProduto = carrinho.some(itemDoCarrinho => itemDoCarrinho.id === novoProduto.id);
    if(!temProduto){
      novoProduto.quantidade = 1;
      return setCarrinho(carrinhoAnterior => [...carrinhoAnterior, novoProduto]);
    }
    setCarrinho(mudarQuantidade(novoProduto.id, 1));}

    function removerProduto(id: string){
      const produto = carrinho.find(itemDoCarrinho => itemDoCarrinho?.id === id);
      const ehUltimo = produto?.quantidade === 1;
      if(ehUltimo){
        return setCarrinho(carrinhoAnterior => carrinhoAnterior.filter(itemDoCarrinho => itemDoCarrinho.id !== id));
      }
      setCarrinho(mudarQuantidade(id, -1));
    }



  return {carrinho, setCarrinho, adicionarProduto, removerProduto, quantidadeProdutos, setQuantidadeProdutos};
}