import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../utils/api';

const RegisterCourse = ({ match, location }) => {
  const history = useHistory();
  const [courses, setCourses] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: true,
    10: true,
  });

  const [courseArray, setCourseArray] = useState([]);

  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name == 9 || name == 10) return;
    setCourses((pre) => ({
      ...pre,
      [name]: checked,
    }));
  };

  const filterValue = Object.fromEntries(
    Object.entries(courses).filter(([key, value]) => value == true)
  );

  const filterLength = Object.values(filterValue).length;

  const handleSubmit = async () => {
    if (filterLength != 6) {
      setError(true);
      return;
    }
    setError(false);
    let keys = [];
    for (let k in courses) {
      if (courses[k]) {
        keys.push(k);
      }
    }
    const [s1, s2, s3, s4, s5, s6] = keys;
    try {
      await api.post('/register-courses', {
        s1,
        s2,
        s3,
        s4,
        s5,
        s6,
        studentId: student_id,
      });
      history.push(`/student/${student_id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    const { data } = await api.get('/get-available-courses');
    setCourseArray(data.courses);
  }, []);

  const { student_id } = match.params;
  return (
    <Box width='100%'>
      <Typography variant='h5' style={{ textAlign: 'center' }}>
        Register Course{' '}
        {location.state ? `for ${location.state.studentName}` : ''}
      </Typography>
      {student_id ? (
        <Box pl='50px'>
          {courseArray.map((data) => {
            const { id, course_name } = data;
            return (
              <Box>
                <FormControlLabel
                  label={course_name}
                  control={
                    <Checkbox
                      checked={courses[id]}
                      name={id}
                      disableRipple
                      color='primary'
                      onChange={handleChange}
                    />
                  }
                />
              </Box>
            );
          })}
          <Box mt='10px'>
            <Button variant='contained' color='primary' onClick={handleSubmit}>
              Register
            </Button>
          </Box>
          {error && (
            <Typography style={{ color: 'red', marginTop: '10px' }}>
              Exactly 6 courses should be registered
            </Typography>
          )}
        </Box>
      ) : (
        <Box>
          <Typography>No student selected</Typography>
        </Box>
      )}
    </Box>
  );
};

export default RegisterCourse;
