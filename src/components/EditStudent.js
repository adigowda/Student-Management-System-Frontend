import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core';
import EditMarks from './EditMarks';
import api from '../utils/api';
import { useHistory } from 'react-router-dom';

const EditStudent = ({ match, location }) => {
  const history = useHistory();
  const { student_id } = match.params;
  const {
    fname,
    lname,
    phone,
    fees,
    paid,
    marks,
    courses,
    studentName,
    email,
  } = location.state;
  const [student, setStudent] = useState({
    fname,
    lname,
    email,
    phone,
    fees,
    paid,
    courses,
  });

  const [studentMarks, setStudentMarks] = useState(marks);
  const [error, setError] = useState(false);

  const detailsArray = [
    {
      label: 'First Name',
      value: student.fname,
      name: 'fname',
    },
    {
      label: 'Last Name',
      value: student.lname,
      name: 'lname',
    },
    {
      label: 'Phone Number',
      value: student.phone,
      name: 'phone',
    },
    {
      label: 'Email',
      value: student.email,
      name: 'email',
    },
    {
      label: 'Fees',
      value: student.fees,
      name: 'fees',
    },
    {
      label: 'Fees Paid',
      value: student.paid,
      name: 'paid',
    },
  ];

  var re =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const handleChange = (e) => {
    const { value, name, type } = e.target;
    if (type === 'number') {
      if (value < 0) {
        return;
      }
    }
    if (name === 'phone') {
      if (value.length > 10) {
        return;
      }
    }
    setStudent((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const { fname, lname, phone, fees, paid, email } = student;
    try {
      if (!fname || !lname || !fees || !paid || !email || !email.match(re)) {
        setError(true);
        return;
      }
      if (phone.length < 10) {
        setError(true);
        return;
      }
      await api.post('/update-student-details', {
        fname,
        lname,
        phone,
        fees,
        paid,
        student_id,
        marks: studentMarks,
        email,
      });
      history.push(`/student/${student_id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box px='30px' mt={3} width='100%'>
      <Typography style={{ textAlign: 'center' }} variant='h5'>
        Edit details of {studentName}
      </Typography>
      <Box mt='40px' mb='40px'>
        <Grid spacing={3} container>
          {detailsArray.map((data, i) => {
            const { label, value, name } = data;
            return (
              <Grid item xs={4}>
                <TextField
                  variant='outlined'
                  fullWidth
                  label={label}
                  value={value}
                  name={name}
                  type={
                    name == 'fees' || name == 'paid' || name === 'phone'
                      ? 'number'
                      : 'text'
                  }
                  onChange={handleChange}
                />
                <br />
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <EditMarks
        courses={courses}
        studentMarks={studentMarks}
        setStudentMarks={setStudentMarks}
      />
      {error && (
        <Box textAlign='center' mt='20px'>
          <Typography style={{ color: 'red' }}>Invalid entries</Typography>
        </Box>
      )}

      <Box textAlign='center' mt='20px'>
        <Button variant='contained' color='primary' onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default EditStudent;
