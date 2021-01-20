import React from 'react';
import * as authUtils from './AuthUtils';
import jwt_decode from 'jwt-decode';
import { ACCESS_TOKEN, AUTH_CONFIG } from './Api';

export const AuthContext = React.createContext();

export const AuthStorage = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [login, setLogin] = React.useState(null);

  React.useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      const jwtDecoded = jwt_decode(token);
      setUser(jwtDecoded);
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);

  function authorizeUser() {
    const codeVerifier = authUtils.generateCodeVerifier();
    const codeChallenge = authUtils.generateCodeChallenge(codeVerifier);
    window.location.href = `${AUTH_CONFIG.authorizeUrl}?response_type=code&client_id=${AUTH_CONFIG.clientId}&redirect_uri=${AUTH_CONFIG.callbackUrl}&code_challenge_method=s256&code_challenge=${codeChallenge}`;
  }

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setLogin(false);
  };

  const buscaAccessToken = React.useCallback(async (code) => {
    const codeVerifier = authUtils.getCodeVerifier();

    let params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', AUTH_CONFIG.callbackUrl);
    params.append('client_id', AUTH_CONFIG.clientId);
    params.append('code_verifier', codeVerifier);

    const token = ACCESS_TOKEN(params);
    const response = await fetch(token.url, token.options);

    if (!response.ok) {
      setLogin(false);
      return false;
    }

    const json = await response.json();
    localStorage.setItem('token', json.access_token);
    const jwtDecoded = jwt_decode(json.access_token);
    setUser(jwtDecoded);
    setLogin(true);
    return true;
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, authorizeUser, logout, buscaAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
