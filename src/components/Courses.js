import React from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const Courses = ({ courses, student_id, studentName }) => {
  const history = useHistory();
  if (!courses.length) {
    return (
      <Box>
        <Typography variant='h5'>Registered Courses</Typography>
        <Typography
          style={{
            marginTop: '20px',
          }}
        >
          No courses registered
        </Typography>
        <Button
          variant='contained'
          color='primary'
          onClick={() => {
            history.push({
              pathname: `/register-course/${student_id}`,
              state: {
                studentName,
              },
            });
          }}
        >
          Register Course
        </Button>
      </Box>
    );
  }
  return (
    <Box mt='20px'>
      <Typography variant='h5'>Registered Courses</Typography>
      <TableContainer
        component={Paper}
        style={{
          cursor: 'default',
          marginTop: '30px',
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                style={{ fontWeight: 'bold', fontSize: '18px' }}
                align='left'
              >
                Sl No
              </TableCell>
              <TableCell
                style={{ fontWeight: 'bold', fontSize: '18px' }}
                align='left'
              >
                Course
              </TableCell>
              <TableCell
                style={{ fontWeight: 'bold', fontSize: '18px' }}
                align='left'
              >
                Teacher Assigned
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((data, i) => {
              const { course_name, teacher, id } = data;
              return (
                <TableRow key={id}>
                  <TableCell style={{ fontSize: '15px' }} align='left'>
                    {i + 1}
                  </TableCell>
                  <TableCell style={{ fontSize: '15px' }} align='left'>
                    {course_name}
                  </TableCell>
                  <TableCell style={{ fontSize: '15px' }} align='left'>
                    {teacher}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Courses;
