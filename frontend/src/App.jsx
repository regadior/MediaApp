import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NotFound from './pages/notfound/NotFound'
import Inicio from './pages/inicio/Inicio';
import LoginPage from './pages/session/login/LoginPage';
import RegisterPage from './pages/session/register/RegisterPage';
import Header from './components/header/Header';
import ProfilePage from './pages/profile/ProfilePage';
function App() {
  const [logged, setLogged] = useState(false);

  // Verificar si el usuario ha iniciado sesión al cargar la aplicación
  let token = window.localStorage.getItem('session_token');
  useEffect(() => {
    if (token) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, [token]);

  function handleClickLogout() {
    window.localStorage.removeItem("session_token");
    setLogged(false);
  }

  return (
    <>
      <Header logged={logged} onClickLogout={handleClickLogout} />
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/profile/:username' element={<ProfilePage />} />
          <Route path='/' element={<Inicio />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
    </>
  );
}

export default App;