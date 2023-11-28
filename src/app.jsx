import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import './app.css';
import Home from './pages/home';
import About from './pages/about';

const defaultUser = {
  title: 'Frontend Developer',
  followers: '1.8k',
  following: '40',
  userName: 'brian zhao',
  gender: 'male',
  phone: '13812345678',
  email: 'brian@gmail.com',
  pass: 'password123',
};

function App() {
  useEffect(() => {
    window.localStorage.setItem('user', JSON.stringify(defaultUser));
  }, []);
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default function WrappedApp() {
  // While the blocklet is deploy to a sub path, this will be work properly.
  const basename = window?.blocklet?.prefix || '/';

  return (
    <Router basename={basename}>
      <App />
    </Router>
  );
}
