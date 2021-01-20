import React from 'react';
import { NavLink } from 'react-router-dom';

const ErroAutorizacao = ({ mensagem }) => {
  return (
    <>
      <div>{mensagem || 'Nao autorizado'}</div>
      <NavLink to="/">Voltar</NavLink>
    </>
  );
};

export default ErroAutorizacao;
