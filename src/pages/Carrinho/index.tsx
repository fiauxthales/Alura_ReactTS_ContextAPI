import { Button, Snackbar, InputLabel, Select, MenuItem } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import { useCarrinhoContext } from "common/context/Carrinho";
import { usePagamentoContext } from "common/context/Pagamento";
import { UsuarioContext } from "common/context/Usuario";
import Produto from 'components/Produto';
import React, {  useContext, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import {Container, Voltar, TotalContainer, PagamentoContainer} from './styles';

function Carrinho(){
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const shopCart = useCarrinhoContext();
  const pagamento = usePagamentoContext();
  const usuario = useContext(UsuarioContext);
  const history = useHistory();
  const total = useMemo(()=> usuario?.saldo! - shopCart!.quantidade.total, [usuario, shopCart]);
  return(
    <Container>
      <Voltar  onClick={()=> history.goBack()}/>
      <h2>
        Carrinho
      </h2>
      {shopCart?.carrinho.map(produto => (
        <Produto produto={produto} key={produto.id} unidade={'kg'} />
      ))}
      <PagamentoContainer>
        <InputLabel> Forma de Pagamento </InputLabel>
        <Select
          value={pagamento?.formaPagamento.id}
          onChange={(event: React.ChangeEvent<{value: unknown}>) => pagamento?.mudarFormaPagamento(event.target.value as number)}
        >
          {pagamento?.tiposPagamento.map(pagamento => (
            <MenuItem value={pagamento.id} key={pagamento.id}>
              {pagamento.nome}
            </MenuItem>
          ))}
        </Select>
      </PagamentoContainer>
      <TotalContainer>
          <div>
            <h2>Total no Carrinho: </h2>
            <span>R$ {shopCart?.quantidade.total.toFixed(2)}</span>
          </div>
          <div>
            <h2> Saldo: </h2>
            <span> R$ {usuario?.saldo.toFixed(2)}</span>
          </div>
          <div>
            <h2> Saldo Total: </h2>
            <span> R$ {total.toFixed(2)}</span>
          </div>
        </TotalContainer>
      <Button
        onClick={() => {
          shopCart?.efetuarCompra();
          setOpenSnackbar(true);
        }}
        disabled={total<0 || shopCart?.quantidade.produtos ===0}
        color="primary"
        variant="contained"
      >
         Comprar
       </Button>
        <Snackbar
          anchorOrigin={
            { 
              vertical: 'top',
              horizontal: 'right'
            }
          }
          open={openSnackbar}
          onClose={() => setOpenSnackbar(false)}
        >
           <MuiAlert
            onClose={() => setOpenSnackbar(false)}
            severity="success"
          >
            Compra feita com sucesso!
          </MuiAlert>
        </Snackbar>
    </Container>
  )
}

export default Carrinho;