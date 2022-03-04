import { User } from 'common/types/User';
import { createContext } from 'react';

export const UsuarioContext = createContext<User | null>(null);