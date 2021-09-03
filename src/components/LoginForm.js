import {
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import api from '../utils/api';

const LoginForm = ({ login, setLogin }) => {
  const [formValue, setFormValue] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState('');

  if (login) {
    return <Redirect to='/home' />;
  }
  const handleSubmit = async (e) => {
    try {
      const { username, password } = formValue;
      e.preventDefault();
      if (!username || !password) return;
      const res = await api.post('/login', {
        username,
        password,
      });
      if (res.data.authenticated) {
        localStorage.setItem('isLoggedin', true);
        setLogin(true);
      }
    } catch (error) {
      console.log(error.response.data);
      setError(true);
      setMsg(error.response.data.msg);
    }
  };
  return (
    <Box width='100%' height='100%'>
      <Box width='30%' margin='0 auto'>
        <Typography style={{ fontSize: '20px', textAlign: 'center' }}>
          Login
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{ padding: '10px', marginTop: '20px' }}
        >
          <TextField
            fullWidth
            value={formValue.username}
            placeholder='Username'
            onChange={(e) => {
              setFormValue((pre) => ({
                ...pre,
                username: e.target.value,
              }));
            }}
            style={{
              borderBottom: '1px solid black',
            }}
            InputProps={{
              disableUnderline: true,
            }}
          />
          <Box height={40} />
          <TextField
            fullWidth
            value={formValue.password}
            placeholder='Password'
            type='password'
            onChange={(e) => {
              setFormValue((pre) => ({
                ...pre,
                password: e.target.value,
              }));
            }}
            style={{
              borderBottom: '1px solid black',
            }}
            InputProps={{
              disableUnderline: true,
            }}
          />
          <Box mt={5}>
            <Button type='submit' variant='contained' fullWidth color='primary'>
              Login
            </Button>
          </Box>
          {error ? (
            <Box
              mt={1}
              textAlign='center'
              style={{ background: 'white' }}
              color='black'
            >
              {msg}
            </Box>
          ) : null}
        </form>
      </Box>
    </Box>
  );
};

export default LoginForm;
