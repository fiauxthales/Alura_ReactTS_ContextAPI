import { User } from 'common/types/User';
import { createContext, useState } from 'react';

export const UsuarioContext = createContext<User | null>(null);
UsuarioContext.displayName = "Usuário";

export function UsuarioProvider({ children }: { children: JSX.Element | JSX.Element[]; }) {
  const [nome, setNome] = useState("");
  const [saldo, setSaldo] = useState<number>(0);
  return (
    <UsuarioContext.Provider value={{ nome, setNome, saldo, setSaldo }}>
      {children}
    </UsuarioContext.Provider>
  );
}