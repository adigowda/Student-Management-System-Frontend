import React, { useState } from 'react';
import { AppBar, Box, Toolbar } from '@material-ui/core';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import './App.css';
import Homepage from './components/Homepage';
import LoginForm from './components/LoginForm';
import NavBar from './components/NavBar';
import Student from './components/Student';
import Search from './components/Search';
import RegisterStudent from './components/RegisterStudent';
import RegisterCourse from './components/RegisterCourse';
import AddMarks from './components/AddMarks';
import EditStudent from './components/EditStudent';
import SliderTest from './components/SliderTest';

const PrivateRoute = ({ component: Component, login, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        login ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/a', state: { from: props.location } }} />
        )
      }
    />
  );
};

function App() {
  const [login, setLogin] = useState(
    localStorage.getItem('isLoggedin') ? true : false
  );

  return (
    <Router>
      <AppBar position='sticky'>
        <Toolbar>Student Management System</Toolbar>
      </AppBar>
      <Box display='flex'>
        {login && <NavBar setLogin={setLogin} />}
        <Route
          path='/'
          exact
          render={() => <LoginForm login={login} setLogin={setLogin} />}
        />
        <Route path='/test' exact component={SliderTest} />

        <PrivateRoute login={login} path='/home' exact component={Homepage} />

        <PrivateRoute
          login={login}
          path='/student/:student_id'
          exact
          component={Student}
        />

        <PrivateRoute
          login={login}
          path='/register-a-student/'
          exact
          component={RegisterStudent}
        />

        <PrivateRoute
          login={login}
          path='/register-course/:student_id'
          exact
          component={RegisterCourse}
        />

        <PrivateRoute
          login={login}
          path='/add-marks/:student_id'
          exact
          component={AddMarks}
        />

        <PrivateRoute
          login={login}
          path='/edit-student/:student_id'
          exact
          component={EditStudent}
        />
      </Box>
    </Router>
  );
}

export default App;
