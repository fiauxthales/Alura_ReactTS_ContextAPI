import {Nav} from './styles';
import {ReactComponent as Logo} from 'assets/logo.svg';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import  IconButton  from '@material-ui/core/IconButton';
import Bagde from '@material-ui/core/Badge';

export default function NavBar(){
  return (
    <Nav>
      <Logo/>
      <IconButton>
        <Bagde color="primary">
          <ShoppingCartIcon/>
        </Bagde>
      </IconButton>
    </Nav>
  )
}