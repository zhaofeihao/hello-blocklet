import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import CardContent from '@mui/material/CardContent';
import { Grid } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import CustomInput from './custom-input';

SettingsCard.propTypes = {
  userName: PropTypes.string,
  gender: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  pass: PropTypes.string,
};

SettingsCard.defaultProps = {
  userName: '',
  gender: '',
  phone: '',
  email: '',
  pass: '',
};

const genderSelect = [
  {
    label: 'Male',
    value: 'male',
  },
  {
    label: 'Female',
    value: 'female',
  },
];

export default function SettingsCard(props) {
  const { userName, gender, phone, email, pass } = props;

  const [tab, setTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);

  const handleTabChange = (e, newValue) => {
    setTab(newValue);
  };

  const [user, setUser] = useState({
    userName,
    gender,
    phone,
    email,
    pass,
  });

  const [edit, update] = useState({
    required: true,
    disabled: true,
    isEdit: false,
  });

  const changeField = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    edit.disabled = !edit.disabled;
    edit.isEdit = !edit.isEdit;
    update({ ...edit });
  };

  const handleSave = () => {
    edit.disabled = !edit.disabled;
    edit.isEdit = !edit.isEdit;
    update({ ...edit });
    setShowPassword(false);
    window.localStorage.setItem('user', JSON.stringify(user));
  };

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    setUser({
      userName,
      gender,
      phone,
      email,
      pass,
    });
  }, [userName, gender, phone, email, pass]);

  return (
    <Card variant="outlined" sx={{ height: '100%', width: '100%' }}>
      <Tabs value={tab} onChange={handleTabChange} textColor="secondary" indicatorColor="secondary">
        <Tab value="profile" label="Profile" />
      </Tabs>
      <Divider />

      <form>
        <CardContent
          sx={{
            p: 3,
            maxHeight: { md: '40vh' },
            textAlign: { xs: 'center', md: 'start' },
          }}>
          <FormControl fullWidth>
            <Grid container direction={{ xs: 'column', md: 'row' }} columnSpacing={5} rowSpacing={3}>
              <Grid item xs={6}>
                <CustomInput
                  id="userName"
                  name="userName"
                  value={user.userName}
                  onChange={changeField}
                  title="User Name"
                  dis={edit.disabled}
                  req={edit.required}
                />
              </Grid>

              <Grid item xs={6}>
                <CustomInput
                  select
                  id="gender"
                  name="gender"
                  value={user.gender}
                  onChange={changeField}
                  title="Gender"
                  dis={edit.disabled}
                  req={edit.required}
                  content={genderSelect.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                />
              </Grid>

              <Grid item xs={6}>
                <CustomInput
                  id="phone"
                  name="phone"
                  value={user.phone}
                  onChange={changeField}
                  title="Phone Number"
                  dis={edit.disabled}
                  req={edit.required}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">+86</InputAdornment>,
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <CustomInput
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={changeField}
                  title="Email Address"
                  dis={edit.disabled}
                  req={edit.required}
                />
              </Grid>

              <Grid item xs={6}>
                <CustomInput
                  id="pass"
                  name="pass"
                  value={user.pass}
                  onChange={changeField}
                  title="Password"
                  dis={edit.disabled}
                  req={edit.required}
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handlePassword} edge="end" disabled={edit.disabled}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid
                container
                justifyContent={{ xs: 'center', md: 'flex-end' }}
                alignItems={{ xs: 'center', md: 'flex-end' }}
                item
                xs={6}>
                {edit.isEdit ? (
                  <Button
                    sx={{ p: '1rem 2rem', my: 0, height: '2rem' }}
                    component="button"
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={handleSave}>
                    SAVE
                  </Button>
                ) : (
                  <Button
                    sx={{ p: '1rem 2rem', my: 0, height: '2rem' }}
                    component="button"
                    size="large"
                    variant="contained"
                    color="secondary"
                    onClick={handleEdit}>
                    EDIT
                  </Button>
                )}
              </Grid>
            </Grid>
          </FormControl>
        </CardContent>
      </form>
    </Card>
  );
}
