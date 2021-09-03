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

const ExamHistory = ({ courses, marks, student_id }) => {
  const history = useHistory();

  return (
    <Box mt='30px'>
      <Typography variant='h5'>Exam History</Typography>
      {marks.length ? (
        <Box mt='30px'>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontSize: '16px' }}>Exam Name</TableCell>
                  {courses.map((course, i) => (
                    <TableCell key={i} style={{ fontSize: '16px' }}>
                      {course.course_name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {marks.map((data) => {
                  const {
                    exam_name,
                    marks_id,
                    subject_1,
                    subject_2,
                    subject_3,
                    subject_4,
                    subject_5,
                    subject_6,
                  } = data;
                  return (
                    <TableRow key={marks_id}>
                      <TableCell style={{ fontSize: '16px' }}>
                        {exam_name}
                      </TableCell>
                      <TableCell align='center' style={{ fontSize: '16px' }}>
                        {subject_1}
                      </TableCell>
                      <TableCell align='center' style={{ fontSize: '16px' }}>
                        {subject_2}
                      </TableCell>
                      <TableCell align='center' style={{ fontSize: '16px' }}>
                        {subject_3}
                      </TableCell>
                      <TableCell align='center' style={{ fontSize: '16px' }}>
                        {subject_4}
                      </TableCell>
                      <TableCell align='center' style={{ fontSize: '16px' }}>
                        {subject_5}
                      </TableCell>
                      <TableCell align='center' style={{ fontSize: '16px' }}>
                        {subject_6}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Typography style={{ marginTop: '25px' }}>
          No Exam History Found
        </Typography>
      )}
      {courses.length ? (
        <Box mt='20px'>
          <Button
            onClick={() =>
              history.push({
                pathname: `/add-marks/${student_id}`,
                state: {
                  student_id,
                  courses,
                },
              })
            }
            variant='contained'
            color='primary'
          >
            Add Marks
          </Button>
        </Box>
      ) : null}
    </Box>
  );
};

export default ExamHistory;
