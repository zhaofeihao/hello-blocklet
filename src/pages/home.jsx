import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ProfileCard from '../components/profile-card';
import SettingsCard from '../components/settings-card';

const theme = createTheme();

// 重写localStorage.setItem方法，便于同页面监听storage变化
const originalSetItem = localStorage.setItem;
window.localStorage.setItem = (key, newValue) => {
  const setItemEvent = new Event('setItemEvent');
  setItemEvent[key] = newValue;
  window.dispatchEvent(setItemEvent);
  originalSetItem.call(localStorage, key, newValue);
};

export default function App() {
  const [storageValue, setStorageValue] = useState({});

  const handleStorageChange = () => {
    setStorageValue(JSON.parse(localStorage.getItem('user')));
  };

  useEffect(() => {
    window.addEventListener('setItemEvent', handleStorageChange);
    return () => {
      window.removeEventListener('setItemEvent', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const cachedUser = window.localStorage.getItem('user') || '{}';
    const userData = JSON.parse(cachedUser);
    setStorageValue(userData);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Grid container direction="column" sx={{ overflowX: 'hidden' }}>
          <Grid item xs={12} md={6}>
            <img
              alt="bg"
              style={{
                width: '100vw',
                height: '35vh',
                objectFit: 'cover',
                position: 'relative',
              }}
              src="https://ik.imagekit.io/bayc/assets/bayc-mutant-hero.jpg"
            />
          </Grid>

          <Grid
            container
            direction={{ xs: 'column', md: 'row' }}
            spacing={3}
            sx={{
              position: 'absolute',
              top: '20vh',
              px: { xs: 0, md: 7 },
            }}>
            <Grid item md={3}>
              <ProfileCard user={storageValue} followers="1.8k" following="46" />
            </Grid>

            <Grid item md={9}>
              <SettingsCard
                userName={storageValue.userName}
                phone={storageValue.phone}
                email={storageValue.email}
                pass={storageValue.pass}
                gender={storageValue.gender}
              />
            </Grid>
          </Grid>
        </Grid>
      </CssBaseline>
    </ThemeProvider>
  );
}
