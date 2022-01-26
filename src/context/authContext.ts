import React, { createContext } from 'react';

interface IAuthContextType {
  loginState: boolean;
  setLoginState: React.Dispatch<React.SetStateAction<boolean>>;
  goRedirect: (code: number) => boolean;
}

const AuthContext = createContext<IAuthContextType>({
  loginState: false,
  setLoginState: () => {},
  goRedirect: (code: number) => false,
});

export default AuthContext;
