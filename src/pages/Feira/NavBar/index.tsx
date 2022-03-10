import {Nav} from './styles';
import {ReactComponent as Logo} from 'assets/logo.svg';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import  IconButton  from '@material-ui/core/IconButton';
import Bagde from '@material-ui/core/Badge';
import { useCarrinhoContext } from 'common/context/Carrinho';
import { useHistory } from 'react-router-dom';

export default function NavBar(){
  const shopCart = useCarrinhoContext();
  const history = useHistory();
  if (!shopCart) return null;
  const { quantidadeProdutos } = shopCart;
  return (
    <Nav>
      <Logo/>
      <IconButton disabled={quantidadeProdutos===0} onClick={()=> history.push('/carrinho')}>
        <Bagde color="primary" badgeContent={quantidadeProdutos}>
          <ShoppingCartIcon/>
        </Bagde>
      </IconButton>
    </Nav>
  )
}