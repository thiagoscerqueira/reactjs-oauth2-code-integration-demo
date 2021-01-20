import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Home = () => {
  const { user, authorizeUser, logout } = React.useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div>
      <p>User: {user ? JSON.stringify(user) : 'nulo'}</p>
      {!user && <button onClick={() => authorizeUser()}>Login</button>}
      {user && <button onClick={() => logout()}>Logout</button>}
      <button onClick={() => navigate('/restaurantes')}>
        Ir para consulta de restaurantes
      </button>
    </div>
  );
};

export default Home;
