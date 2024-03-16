import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';

import SignUp from './pages/SignUp';
import Header from './components/Header';
import SignIn from './pages/SignIn';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import CreatePost from './pages/CreatePost';

// This component represents the root of your application.
export default function App() {
  return (
    // BrowserRouter provides the routing functionality to the entire application.
    <BrowserRouter>
      {/* Header component is rendered at the top of the application */}
      <Header />
      {/* Routes component contains all the route definitions for the application */}
      <Routes>
        {/* Route for the home page */}
        <Route path='/' element={<Home />} />
        {/* Route for the about page */}
        <Route path='/about' element={<About />} />
        {/* Route for the sign-in page */}
        <Route path='/sign-in' element={<SignIn/>} />
        {/* Route for the sign-up page */}
        <Route path='/sign-up' element={<SignUp />} /> 

        {/* PrivateRoute component restricts access to the dashboard page to authenticated users */}
        <Route element={<PrivateRoute/>}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        {/* Route for the create post page */}
        <Route path='/create-post' element={<CreatePost />} /> 
      </Routes>
      {/* Footer component is rendered at the bottom of the application */}
      <Footer />
    </BrowserRouter>
  )
}
