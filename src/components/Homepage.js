import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, makeStyles } from '@material-ui/core';
import api from '../utils/api';
import { Link } from 'react-router-dom';
import Search from './Search';

const useStyles = makeStyles({
  profile: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#cdd0cb',
    },
  },
});

const Homepage = () => {
  const classes = useStyles();
  const [students, setStudents] = useState([]);

  console.log(students);

  useEffect(async () => {
    const res = await api('/get-all-students');
    setStudents(res.data);
  }, []);

  return (
    <Box mt={3} width='100%'>
      <Box textAlign='center'>
        <Typography style={{ fontSize: '25px' }}>
          Students Registered
        </Typography>
      </Box>
      <Search setStudents={setStudents} />
      {students.map((data, i) => {
        const { student_id, fname, lname, gender, phone, email } = data;
        return (
          <Link to={`/student/${student_id}`} key={student_id}>
            <Box
              className={classes.profile}
              ml='10px'
              mt='20px'
              bgcolor='#dddddd'
              p={2}
            >
              <Box display='flex'>
                <img
                  src={gender == 'M' ? 'male-avatar.png' : 'female-avatar.jpg'}
                  width='100px'
                  height='100px'
                />
                <Box ml='10px'>
                  <Typography>
                    Name: {fname} {lname}
                  </Typography>
                  <Typography>Phone: {phone}</Typography>
                  <Typography>Email: {email}</Typography>
                </Box>
              </Box>
            </Box>
          </Link>
        );
      })}
    </Box>
  );
};

export default Homepage;
