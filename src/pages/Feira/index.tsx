import {
  Container,
  Header,
  Lista,
} from './styles';
import feira from './feira.json';
import Produto from 'components/Produto';
import NavBar from './NavBar';
import { useContext } from 'react';
import { UsuarioContext } from 'common/context/Usuario';
import { Product } from 'common/types/Product';

function Feira(){
  const {nome , saldo} = useContext(UsuarioContext) || {};
  let novaFeira: Product[] = feira;
  return (
    <Container>
      <NavBar/>
      <Header>
        <div>
          <h2>Olá, {nome}!</h2>
          <h3>Saldo:R$ {saldo}</h3>
        </div>
        <p>Encontre os melhores produtos orgânicos do mundo!</p>
      </Header>
      <Lista>
        <h2>
          Produtos:
        </h2>
        {
          novaFeira.map( produto => (
            <Produto
            produto={produto} unidade={'5'}
            key={produto.id}            />
          ))}
      </Lista>
    </Container>
  )
}

export default Feira;