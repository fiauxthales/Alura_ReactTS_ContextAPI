import { Container } from './styles';
import { memo } from 'react';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useCarrinhoContext} from 'common/context/Carrinho';
import { Product } from 'common/types/Product';


function Produto({produto, unidade}:{produto: Product, unidade: string}) {
  const shopCart = useCarrinhoContext();
  if (!shopCart) return null;
  const {carrinho, adicionarProduto} = shopCart;
  const produtoNoCarrinho = carrinho.find(itemDoCarrinho => itemDoCarrinho.id === produto.id);
  return (
      <Container>
        <div>
          <img
            src={`/assets/${produto.foto}.png`}
            alt={`foto de ${produto.nome}`}
          />
          <p>
            {produto.nome} - R$ {produto.valor?.toFixed(2)} <span>Kg</span>
          </p>
        </div>
        <div>
          <IconButton
            color="secondary"
          >
            <RemoveIcon />
          </IconButton>
          {produtoNoCarrinho?.quantidade || 0}
          <IconButton onClick={()=> adicionarProduto(produto)}>
            <AddIcon />
          </IconButton>
        </div>
      </Container>
  )
}

export default memo(Produto)