import { Box, Button, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../utils/api';
import Courses from './Courses';
import ExamHistory from './ExamHistory';

const Student = ({ match }) => {
  const history = useHistory();
  const { student_id } = match.params;
  console.log('id', student_id);
  const [student, setStudent] = useState({
    student_id,
    fname: '',
    lname: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
    doj: '',
    fees: 0,
    paid: 0,
    courses: [],
    marks: [],
  });

  useEffect(async () => {
    window.scrollTo(0, 0);
    const res = await api.get(`/get-student/${student_id}`);

    const { fname, lname, email, phone, gender, dob, doj, fees, paid } =
      res.data.details;
    setStudent((pre) => ({
      ...pre,
      fname,
      lname,
      email,
      phone,
      gender,
      dob,
      doj,
      fees,
      paid,
      courses: res.data.courses,
      marks: res.data.marks,
    }));
  }, []);
  const { fname, lname, email, phone, gender, dob, doj, fees, paid } = student;
  console.log(email);
  const { courses, marks } = student;
  const basicDetails = [
    {
      title: 'Name',
      data: `${fname} ${lname}`,
    },
    {
      title: 'Email',
      data: email,
    },

    {
      title: 'Phone',
      data: `+91 ${phone}`,
    },

    {
      title: 'Gender',
      data: gender == 'M' ? 'Male' : 'Female',
    },

    {
      title: 'Date Of Birth',
      data: dob.substr(0, 10),
    },

    {
      title: 'Date of Joining',
      data: doj.substr(0, 10),
    },
  ];
  return (
    <Paper
      style={{
        width: '80%',
        margin: '0 auto',
        marginTop: '20px',
        padding: '20px',
      }}
    >
      <Box textAlign='center'>
        <img
          width='100px'
          height='100px'
          src={gender == 'M' ? '/male-avatar.png' : '/female-avatar.jpg'}
        />
      </Box>
      <Box display='flex' mt='40px'>
        <Box>
          <Typography variant='h5' style={{ marginLeft: '20px' }}>
            Basic Details
          </Typography>
          <table
            style={{
              borderSpacing: '20px',
              cursor: 'default',
            }}
          >
            {basicDetails.map((details, i) => {
              const { title, data } = details;
              return (
                <tr key={i}>
                  <td className='title-td'>{title}</td>
                  <td>{data}</td>
                </tr>
              );
            })}
          </table>
        </Box>
        <Box ml='50px'>
          <Typography variant='h5' style={{ marginLeft: '20px' }}>
            Fees Details
          </Typography>
          <table
            style={{
              borderSpacing: '20px',
              cursor: 'default',
            }}
          >
            <tbody>
              <tr>
                <td className='title-td'>Total Fees</td>
                <td>{fees}</td>
              </tr>
              <tr>
                <td className='title-td'>Fees Paid </td>
                <td>{paid} </td>
              </tr>
              <tr>
                <td className='title-td'>Fees Due</td>
                <td>{fees - paid}</td>
              </tr>
              <Button
                variant='contained'
                color='primary'
                onClick={() =>
                  history.push({
                    pathname: `/edit-student/${student_id}`,
                    state: {
                      fname,
                      lname,
                      phone,
                      fees,
                      paid,
                      courses,
                      marks,
                      studentName: `${fname} ${lname}`,
                      email,
                    },
                  })
                }
              >
                Edit Details
              </Button>
              <br />
              <Button
                variant='contained'
                color='primary'
                style={{ marginTop: 5 }}
                onClick={async () => {
                  await api.post('/delete-student', {
                    student_id,
                  });
                  history.push('/home');
                }}
              >
                Delete Student
              </Button>
            </tbody>
          </table>
        </Box>
      </Box>
      <Courses
        studentName={`${fname} ${lname}`}
        student_id={student_id}
        courses={courses}
      />
      <ExamHistory student_id={student_id} courses={courses} marks={marks} />
    </Paper>
  );
};

export default Student;
