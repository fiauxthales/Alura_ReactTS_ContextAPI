import {Nav} from './styles';
import {ReactComponent as Logo} from 'assets/logo.svg';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import  IconButton  from '@material-ui/core/IconButton';
import Bagde from '@material-ui/core/Badge';
import { useCarrinhoContext } from 'common/context/Carrinho';

export default function NavBar(){
  const shopCart = useCarrinhoContext();
  if (!shopCart) return null;
  const { quantidadeProdutos } = shopCart;
  return (
    <Nav>
      <Logo/>
      <IconButton disabled={quantidadeProdutos===0}>
        <Bagde color="primary" badgeContent={quantidadeProdutos}>
          <ShoppingCartIcon/>
        </Bagde>
      </IconButton>
    </Nav>
  )
}