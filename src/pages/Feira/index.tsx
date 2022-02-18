import {
  Container,
  Header,
  Lista,
} from './styles';
import feira from './feira.json';
import Produto from 'components/Produto';
import NavBar from './NavBar';

function Feira(){
  return (
    <Container>
      <NavBar/>
      <Header>
        <div>
          <h2>Olá!</h2>
          <h3>Saldo:R$</h3>
        </div>
        <p>Encontre os melhores produtos orgânicos do mundo!</p>
      </Header>
      <Lista>
        <h2>
          Produtos:
        </h2>
        {
          feira.map( produto => (
            <Produto
            unidade={'5'} {...produto}
            key={produto.id}            />
          ))}
      </Lista>
    </Container>
  )
}

export default Feira;