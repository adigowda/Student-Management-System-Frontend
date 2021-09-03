import React, { useState } from 'react';
import { Box, TextField, Typography } from '@material-ui/core';
import api from '../utils/api';

const Search = ({ setStudents }) => {
  const [name, setName] = useState('');
  const handleChange = (e) => {
    setName(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (name) {
        const res = await api.get(`/search/${name}`);
        setStudents(res.data);
      } else {
        const res = await api.get('/get-all-students');
        setStudents(res.data);
      }
    } catch (error) {}
  };
  return (
    <Box mt={2} mb={2}>
      <Box width='80%' margin='auto'>
        <form onSubmit={handleSubmit}>
          <TextField
            InputLabelProps={{ style: { fontSize: '18px' } }}
            InputProps={{ style: { fontSize: '18px' } }}
            autoFocus
            fullWidth
            label='Search'
            variant='outlined'
            value={name}
            onChange={handleChange}
          />
        </form>
      </Box>
    </Box>
  );
};

export default Search;
