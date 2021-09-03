import React from 'react';
import { Box, Button, Drawer as MUIDrawer } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const drawer = () => (
  <Box>
    <Box height='40px'>
      <NavLink
        exact
        style={{ marginTop: '2px' }}
        className='side-link'
        activeClassName='side-link-active'
        to='/home'
      >
        Home
      </NavLink>
    </Box>
    <Box height='40px'>
      <NavLink
        className='side-link'
        activeClassName='side-link-active'
        to='/student/'
      >
        Student
      </NavLink>
    </Box>
    <Box height='40px'>
      <NavLink
        exact
        className='side-link'
        activeClassName='side-link-active'
        to='/register-a-student/'
      >
        Register a Student
      </NavLink>
    </Box>
    <Box height='40px'>
      <NavLink
        className='side-link'
        activeClassName='side-link-active'
        to='/register-course/'
      >
        Register Course
      </NavLink>
    </Box>
    <Box height='40px'>
      <NavLink
        className='side-link'
        activeClassName='side-link-active'
        to='/add-marks/'
      >
        Add Marks
      </NavLink>
    </Box>
    <Box height='40px'>
      <NavLink
        className='side-link'
        activeClassName='side-link-active'
        to='/edit-student/'
      >
        Edit Student
      </NavLink>
    </Box>
  </Box>
);

const Drawer = ({ setLogin }) => {
  return (
    <Box>
      <MUIDrawer
        style={{ width: '180px' }}
        className='left-drawer'
        variant='persistent'
        open
      >
        {drawer()}
        <Button
          style={{ marginTop: '10px', borderRadius: 0 }}
          variant='contained'
          color='primary'
          onClick={() => {
            localStorage.removeItem('isLoggedin');
            setLogin(false);
          }}
        >
          Logout
        </Button>
      </MUIDrawer>
    </Box>
  );
};

export default Drawer;
