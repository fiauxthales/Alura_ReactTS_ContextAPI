export interface User{
  nome: string,
  setNome: React.Dispatch<React.SetStateAction<string>>,
  saldo: number | string,
  setSaldo: React.Dispatch<React.SetStateAction<number | string>>
}