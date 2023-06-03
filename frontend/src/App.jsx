import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/notfound/NotFound'
import Index from './pages/index/Index';
import LoginPage from './pages/session/login/LoginPage';
import RegisterPage from './pages/session/register/RegisterPage';
import Header from './components/header/Header';
import ProfilePage from './pages/profile/ProfilePage';
function App() {


  return (
    <>
      <Header />
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/profile/:username' element={<ProfilePage />} />
          <Route path='/' element={<Index />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
    </>
  );
}

export default App;