import { Amount } from 'common/types/Amount';
import { Product } from 'common/types/Product';
import { ShopCart } from 'common/types/ShopCart';
import {createContext, useContext, useEffect, useState} from 'react';
import { usePagamentoContext } from './Pagamento';
import { UsuarioContext } from './Usuario';

export const CarrinhoContext = createContext<ShopCart|null>(null);
CarrinhoContext.displayName = "Carrinho";

export const CarrinhoProvider = ({children}: {children: JSX.Element | JSX.Element[]}) => {
  const[carrinho, setCarrinho] = useState<Array<Product>>([]);
  const[quantidade, setQuantidade] = useState<Amount>({produtos: 0, total: 0});
  return(
    <CarrinhoContext.Provider 
      value={{carrinho, setCarrinho, quantidade, setQuantidade}}>
      {children}
    </CarrinhoContext.Provider>
  )
}

export const useCarrinhoContext = () => {
  const shopCart = useContext(CarrinhoContext);
  const pagamento = usePagamentoContext();
  const usuario = useContext(UsuarioContext);

  useEffect(()=> {
    
    const novaQuantidade = shopCart?.carrinho.reduce(
      (contador, produto) => (
        {produtos: contador.produtos + produto.quantidade!, total: contador.total + (produto.valor * produto.quantidade!)}),
        {produtos: 0, total: 0}
      );
      novaQuantidade!.total = novaQuantidade?.total! * pagamento?.formaPagamento.juros!;
    shopCart?.setQuantidade(novaQuantidade!);
}, [shopCart, pagamento]);


  if(!shopCart) return null;
  const {carrinho, setCarrinho, quantidade, setQuantidade} = shopCart;


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

    function efetuarCompra(){
      setCarrinho([]);
      usuario?.setSaldo((saldoAtual) => saldoAtual - shopCart!.quantidade.total);
    }

  return {carrinho, setCarrinho, adicionarProduto, removerProduto, quantidade, setQuantidade, efetuarCompra};
}