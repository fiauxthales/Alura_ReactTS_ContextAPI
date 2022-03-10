import { PaymentType } from "./PaymentType";

export interface Payment{
  tiposPagamento: PaymentType[],
  formaPagamento: PaymentType,
  setFormaPagamento: React.Dispatch<React.SetStateAction<PaymentType>>,
}