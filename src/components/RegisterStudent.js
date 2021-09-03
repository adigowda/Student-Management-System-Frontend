import {
  Box,
  Button,
  TextField,
  Typography,
  makeStyles,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import api from '../utils/api';

const useStyles = makeStyles({
  root: {
    margin: '15px 0',
  },
});

const RegisterStudent = () => {
  const classes = useStyles();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [details, setDetails] = useState({
    fname: '',
    lname: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
    doj: '',
    fees: null,
    paid: null,
  });
  const [redirect, setRediret] = useState({
    id: 1,
    red: false,
  });
  const [error, setError] = useState({
    isError: false,
    errMsg: '',
  });
  const { fname, lname, email, phone, gender, dob, doj, fees, paid } = details;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      if (value.length > 10) {
        return;
      }
    }

    if (e.target.type === 'number') {
      if (value < 0) return;
    }

    setDetails((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  var re =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !fname ||
      !lname ||
      !email ||
      !phone | !gender ||
      !dob ||
      !doj ||
      !fees ||
      !paid ||
      phone.length < 10
    ) {
      setError({
        isError: true,
        errMsg: 'Please fill all the required fields',
      });
      return;
    }
    if (!email.match(re)) {
      setError({
        isError: true,
        errMsg: 'Invalid Email',
      });
      return;
    }
    try {
      const res = await api.post('/create-student', {
        fname,
        lname,
        email,
        phone,
        gender,
        dob,
        doj,
        fees,
        paid,
      });
      setRediret({
        red: true,
        id: res.data.id,
      });
    } catch (error) {
      console.log(error.response.data);
      setError({
        isError: true,
        errMsg: error.response.data.msg,
      });
    }
  };

  if (redirect.red) {
    return <Redirect to={`/student/${redirect.id}`} />;
  }

  return (
    <Box width='100%'>
      <Box mt='40px' px='30px' width='60%' margin='0 auto'>
        <Typography style={{ textAlign: 'center', fontSize: '20px' }}>
          Register a Student
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* <p>First Name *</p> */}
          <TextField
            placeholder='First Name *'
            variant='outlined'
            fullWidth
            type='text'
            name='fname'
            classes={{ root: classes.root }}
            value={fname}
            formNoValidate
            onChange={handleChange}
          />

          {/* <p>Last Name *</p> */}
          <TextField
            placeholder='Last Name *'
            variant='outlined'
            classes={{ root: classes.root }}
            type='text'
            fullWidth
            formNoValidate
            name='lname'
            value={lname}
            onChange={handleChange}
          />

          {/* <p>Email *</p> */}
          <TextField
            placeholder='Email *'
            variant='outlined'
            classes={{ root: classes.root }}
            type='text'
            formNoValidate
            fullWidth
            name='email'
            value={email}
            onChange={handleChange}
          />

          {/* <p>Phone*</p> */}
          <TextField
            placeholder='Phone *'
            variant='outlined'
            classes={{ root: classes.root }}
            fullWidth
            type='number'
            formNoValidate
            name='phone'
            value={phone}
            onChange={handleChange}
          />
          <Box display='flex' alignItems='center'>
            <Box>
              <p>Gender *</p>
              <RadioGroup
                aria-label='gender'
                value={gender}
                name='gender'
                color='primary'
                onChange={handleChange}
              >
                <FormControlLabel
                  value='M'
                  control={<Radio color='primary' />}
                  label='Male'
                />
                <FormControlLabel
                  value='F'
                  control={<Radio color='primary' />}
                  label='Female'
                />
              </RadioGroup>
              <br></br>
            </Box>
            <Box display='flex' justifyContent='space-around' width='450px'>
              <Box>
                <p>Date Of Birth *</p>
                <TextField
                  formNoValidate
                  type='date'
                  value={dob}
                  name='dob'
                  onChange={handleChange}
                />
              </Box>

              <Box>
                <p>Date Of Joining *</p>
                <TextField
                  formNoValidate
                  type='date'
                  value={doj}
                  name='doj'
                  onChange={handleChange}
                />
              </Box>
            </Box>
          </Box>
          <Box display='flex'>
            <Box>
              <TextField
                placeholder='Total Fees *'
                variant='outlined'
                formNoValidate
                type='number'
                // style={{ width: '95%' }}
                fullWidth
                value={fees}
                classes={{ root: classes.root }}
                name='fees'
                onChange={handleChange}
              />
            </Box>
            <Box ml={4}>
              <TextField
                variant='outlined'
                placeholder='Fees Paid*'
                type='number'
                classes={{ root: classes.root }}
                fullWidth
                // style={{ width: '95%' }}
                value={paid}
                formNoValidate
                name='paid'
                onChange={handleChange}
              />
            </Box>
          </Box>

          {error.isError && (
            <Box mt='15px' textAlign='center' mb='15px'>
              <p style={{ color: 'red' }}>{error.errMsg} </p>
            </Box>
          )}
          <Box textAlign='center' width='100%' mt={3} pb={3}>
            <Button fullWidth variant='contained' color='primary' type='submit'>
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default RegisterStudent;
