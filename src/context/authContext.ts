import { createContext } from 'react';

interface IAuthContextType {
  hasLoggedIn: boolean;
}

const AuthContext = createContext<IAuthContextType>({ hasLoggedIn: false });

export default AuthContext;
