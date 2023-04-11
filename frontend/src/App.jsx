import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NotFound from './screens/notfound/NotFound'
import Inicio from './screens/inicio/Inicio';
import Login from './screens/session/login/Login';
import Register from './screens/session/register/Register';
import Header from './components/header/Header';
function App() {
  const [logged, setLogged] = useState(false);

  // Verificar si el usuario ha iniciado sesión al cargar la aplicación
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      setLogged(true);
    }
  }, [token]);//Se pone un [token] para que se actualize cada vez que cambia el token

  return (
    <>
      <Header logged={logged} />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Inicio />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
    </>
  );
}

export default App;