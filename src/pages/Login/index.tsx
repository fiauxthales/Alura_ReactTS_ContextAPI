import {Button} from '@material-ui/core';
import {
  Container,
  Titulo,
  InputContainer
} from './styles';
import{
  Input,
  InputLabel,
  InputAdornment
} from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import {UsuarioContext} from 'common/context/Usuario';
import { useContext } from 'react';

function Login(){
  const history = useHistory();
  const usuario = useContext(UsuarioContext);
  return(
    <Container>
      <Titulo>
      Insira o seu nome
      </Titulo>
      <InputContainer>
        <InputLabel>
          Nome
        </InputLabel>
        <Input
          value={usuario?.nome}
          onChange={(event) => usuario?.setNome(event.target.value)}
          type="text"
        />
      </InputContainer>
      <InputContainer>
        <InputLabel>
          Saldo
        </InputLabel>
        <Input
          value={usuario?.saldo}
          onChange={(event) => usuario?.setSaldo(parseFloat(event.target.value))}
          type="number"
          startAdornment={
          <InputAdornment position="start">
            R$
          </InputAdornment>
        }
      />
      </InputContainer>
      <Button
        variant="contained"
        color="primary"
        disabled={usuario?.nome.length! < 4}
        onClick={()=> history.push('/feira')}
      >
        Avançar
      </Button>
    </Container>
  )
}

export default Login;
