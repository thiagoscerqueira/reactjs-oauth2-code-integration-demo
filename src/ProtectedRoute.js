import React from 'react';
import { Route } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import ErroAutorizacao from './ErroAutorizacao';

const ProtectedRoute = ({ authorities, ...rest }) => {
  const { login, user } = React.useContext(AuthContext);

  if (login === false) {
    return <ErroAutorizacao mensagem="Usuário não autenticado" />;
  }

  if (
    login === true &&
    authorities &&
    (!user.authorities ||
      !user.authorities.some((a) => authorities.includes(a)))
  ) {
    return (
      <ErroAutorizacao mensagem="Usuário não possui autorização para acessar este recurso" />
    );
  }

  if (login === true) {
    return <Route {...rest} />;
  } else return null;
};

export default ProtectedRoute;
