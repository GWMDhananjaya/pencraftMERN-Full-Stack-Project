// Importing necessary components and hooks from external libraries and local files
import { Avatar, Button, Navbar, Dropdown } from 'flowbite-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';

// Defining a functional component called Header
export default function Header() {
  // Getting the current path using the useLocation hook from react-router-dom
  const path = useLocation().pathname;
  // Getting dispatch function from useDispatch hook to dispatch actions
  const dispatch = useDispatch();

  // Extracting currentUser and theme from Redux store state
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  // Function to handle user signout
  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Rendering the header component
  return (
    <Navbar className='border-b-2'>
      {/* Logo linking to home page */}
      <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className=''>Pencraft</span>
      </Link>

      {/* Section for buttons and navigation links */}
      <div className='flex gap-2 md:order-2'>
        {/* Button to toggle light/dark theme */}
        <Button
          className='w-12 h-10 hidden sm:inline'
          color='gray'
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>

        {/* Conditional rendering based on whether user is logged in */}
        {currentUser ? (
          // Dropdown menu for user profile and signout
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt='user' img={currentUser.profilePicture} rounded />}
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          // Button to sign in if user is not logged in
          <Link to='/sign-in'>
            <Button gradientDuoTone='purpleToBlue' outline>
              Sign In
            </Button>
          </Link>
        )}
        {/* Navbar toggle button */}
        <Navbar.Toggle />
      </div>

      {/* Collapsible navigation links */}
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={'div'}>
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={'div'}>
          <Link to='/about'>About Us</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
