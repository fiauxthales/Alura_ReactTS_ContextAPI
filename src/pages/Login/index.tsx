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
import React from 'react';
import {useHistory} from 'react-router-dom';

interface LoginProps{
  nome: string,
  setNome: React.Dispatch<React.SetStateAction<string>>,
  saldo: number | string,
  setSaldo: React.Dispatch<React.SetStateAction<number | string>>
}

function Login(props: LoginProps){
  const history = useHistory();
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
          value={props.nome}
          onChange={(event) => props.setNome(event.target.value)}
          type="text"
        />
      </InputContainer>
      <InputContainer>
        <InputLabel>
          Saldo
        </InputLabel>
        <Input
          value={props.saldo}
          onChange={(event) => props.setSaldo(event.target.value)}
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
        onClick={()=> history.push('/feira')}
      >
        Avançar
      </Button>
    </Container>
  )
}

export default Login;