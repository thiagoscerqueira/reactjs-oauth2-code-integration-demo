import React from 'react';
import { NavLink } from 'react-router-dom';
import { RESTAURANTES_GET } from './Api';
import useFetch from './useFetch';

const ConsultaRestaurantes = () => {
  const { data, request, error } = useFetch();

  React.useEffect(() => {
    async function loadData() {
      const { url, options } = RESTAURANTES_GET();
      await request(url, options);
    }

    loadData();
  }, [request]);

  return (
    <>
      {data ? <div>{JSON.stringify(data)}</div> : <div>Ainda nao tem dado</div>}
      {error && <div>Erro ao buscar dados</div>}
      <NavLink to="/">Voltar</NavLink>
    </>
  );
};

export default ConsultaRestaurantes;
