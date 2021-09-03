import { Box, Button, Grid, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../utils/api';

const AddMarks = ({ location }) => {
  const history = useHistory();
  const { student_id, courses } = location.state;
  const [marks, setMarks] = useState({
    0: '',
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    examName: '',
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (value < 0 || value > 100) return;
    setMarks((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await api.post('/add-marks', {
        s1: marks[0],
        s2: marks[1],
        s3: marks[2],
        s4: marks[3],
        s5: marks[4],
        s6: marks[5],
        examName: marks.examName,
        studentId: student_id,
      });
      console.log(res.data);
      history.push(`/student/${student_id}`);
    } catch (error) {
      throw error;
    }
  };

  return (
    <Box px='50px'>
      <Typography
        style={{
          textAlign: 'center',
          margin: '20px 0',
        }}
        variant='h5'
      >
        Add Marks
      </Typography>
      <Grid container spacing={7}>
        <Grid item xs={12}>
          <TextField
            name='examName'
            value={marks.examName}
            onChange={handleChange}
            InputProps={{
              disableUnderline: true,
            }}
            style={{
              borderBottom: '1px solid black',
            }}
            placeholder='Exam Name'
          />
        </Grid>
        {courses.map((data, i) => {
          return (
            <Grid item xs={4} key={i}>
              <TextField
                value={marks[i]}
                onChange={handleChange}
                name={i.toString()}
                fullWidth
                placeholder={data.course_name}
                type='number'
                InputProps={{
                  disableUnderline: true,
                }}
                style={{
                  borderBottom: '1px solid black',
                }}
              />
            </Grid>
          );
        })}
      </Grid>
      <Box mt='20px' textAlign='center'>
        <Button variant='contained' color='primary' onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default AddMarks;
