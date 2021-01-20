import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const { buscaAccessToken } = React.useContext(AuthContext);
  const [erro, setErro] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    async function buscaToken() {
      const pegouToken = await buscaAccessToken(searchParams.get('code'));
      if (pegouToken) {
        navigate('/');
      } else {
        setErro(true);
      }
    }
    buscaToken();
  }, [searchParams, navigate, buscaAccessToken]);

  return (
    <>
      {!erro && <div>Obtendo token de acesso ...</div>}
      {erro && <div>Erro ao obter token de acesso ...</div>}
    </>
  );
};

export default AuthCallback;
