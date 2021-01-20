import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthCallback from './AuthCallback';
import { AuthStorage } from './AuthContext';
import ConsultaRestaurantes from './ConsultaRestaurantes';
import ErroAutorizacao from './ErroAutorizacao';
import Home from './Home';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthStorage>
        <Routes>
          <Route path="/" element={<Home />} />
          <ProtectedRoute
            authorities={['GESTOR', 'CONSULTAR_RESTAURANTES', 'ADMINISTRADOR']}
            path="/restaurantes"
            element={<ConsultaRestaurantes />}
          />
          <Route path="/auth" element={<AuthCallback />} />
          <Route path="/erroAutorizacao" element={<ErroAutorizacao />} />
        </Routes>
      </AuthStorage>
    </BrowserRouter>
  );
}

export default App;
