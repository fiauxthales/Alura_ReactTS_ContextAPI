import { createContext, useContext, useState } from "react";
import paymentTypes from './../data/paymentTypes.json';
import { PaymentType } from "common/types/PaymentType";
import { Payment } from "common/types/Payment";

export const PagamentoContext = createContext<Payment | null>(null);
PagamentoContext.displayName = "Pagamento";

export const PagamentoProvider = ({children}:{children: JSX.Element | JSX.Element[]}) => {
  const tiposPagamento: PaymentType[] = paymentTypes;
  const [formaPagamento, setFormaPagamento] = useState(tiposPagamento[0]);
  return(
    <PagamentoContext.Provider value={{
      tiposPagamento,
      formaPagamento,
      setFormaPagamento
    }}>
      {children}
    </PagamentoContext.Provider>
  )
}

export const usePagamentoContext = ()=> {
  const pagamento = useContext(PagamentoContext);
  if(!pagamento) return null;
  const {tiposPagamento, formaPagamento, setFormaPagamento} = pagamento;

  function mudarFormaPagamento(id: number){
    const pagamentoAtual = tiposPagamento.find(pagamento => pagamento.id === id);
    setFormaPagamento(pagamentoAtual!);
  }
  return {tiposPagamento, formaPagamento, mudarFormaPagamento}
}