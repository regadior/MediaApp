import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/notfound/NotFound'
import Index from './pages/index/Index';
import LoginPage from './pages/session/login/LoginPage';
import RegisterPage from './pages/session/register/RegisterPage';
import Header from './components/header/Header';
import ProfilePage from './pages/profile/ProfilePage';
import GameDetails from './pages/game-details/GameDetails';
import Lists from './pages/lists/Lists';
function App() {


  return (
    <>
      <Header />
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/:username' element={<ProfilePage />} />
          <Route path='/game/:gameName' element={<GameDetails />} />
          <Route path='/:username/lists' element={<Lists />} />
          <Route path='/' element={<Index />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
    </>
  );
}

export default App;