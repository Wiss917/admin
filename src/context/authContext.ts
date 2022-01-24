import { createContext } from 'react';

interface IAuthContextType {
  hasLoggedIn: boolean;
  setLoginState: (state: boolean) => void;
  goRedirect: (code: number) => boolean;
}

const AuthContext = createContext<IAuthContextType>({
  hasLoggedIn: false,
  setLoginState: () => {},
  goRedirect: (code: number) => false,
});

export default AuthContext;
