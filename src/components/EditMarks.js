import React from 'react';
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  TextField,
  Typography,
} from '@material-ui/core';

const EditMarks = ({ courses, studentMarks, setStudentMarks }) => {
  console.log(courses);
  console.log(studentMarks);
  if (studentMarks.length)
    return (
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
            {studentMarks.map((data, i) => {
              const {
                marks_id,
                subject_1,
                subject_2,
                subject_3,
                subject_4,
                subject_5,
                subject_6,
                exam_name,
              } = data;
              return (
                <TableRow key={marks_id}>
                  <TableCell>{exam_name}</TableCell>
                  <TextCell
                    idx={i}
                    subject={subject_1}
                    setStudentMarks={setStudentMarks}
                    course={'subject_1'}
                    studentMarks={studentMarks}
                  />
                  <TextCell
                    idx={i}
                    subject={subject_2}
                    setStudentMarks={setStudentMarks}
                    course={'subject_2'}
                    studentMarks={studentMarks}
                  />
                  <TextCell
                    idx={i}
                    subject={subject_3}
                    setStudentMarks={setStudentMarks}
                    course={'subject_3'}
                    studentMarks={studentMarks}
                  />
                  <TextCell
                    idx={i}
                    subject={subject_4}
                    setStudentMarks={setStudentMarks}
                    course={'subject_4'}
                    studentMarks={studentMarks}
                  />
                  <TextCell
                    idx={i}
                    subject={subject_5}
                    setStudentMarks={setStudentMarks}
                    course={'subject_5'}
                    studentMarks={studentMarks}
                  />
                  <TextCell
                    idx={i}
                    subject={subject_6}
                    setStudentMarks={setStudentMarks}
                    course={'subject_6'}
                    studentMarks={studentMarks}
                  />
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  else
    return (
      <Typography style={{ fontSize: '18px', textAlign: 'center' }}>
        Exam history not found
      </Typography>
    );
};

const TextCell = ({ subject, idx, course, setStudentMarks, studentMarks }) => {
  return (
    <TableCell align='center' width='120px'>
      <TextField
        InputProps={{ disableUnderline: true }}
        style={{
          borderBottom: '1px solid black',
        }}
        type='number'
        value={subject}
        onChange={(e) => {
          const { value } = e.target;
          console.log(value);
          if (value >= 0 && value <= 100) {
            var data = [...studentMarks];
            data[idx][course] = value;
            setStudentMarks(data);
          }
        }}
      />
    </TableCell>
  );
};

export default EditMarks;
