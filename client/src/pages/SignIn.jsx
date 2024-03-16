// Importing necessary components and hooks from external libraries and local files
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'; // Importing UI components
import { useState } from 'react'; // Importing useState hook from React
import { Link, useNavigate } from 'react-router-dom'; // Importing Link component and useNavigate hook from React Router
import { useDispatch, useSelector } from 'react-redux'; // Importing useDispatch and useSelector hooks from Redux
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice'; // Importing Redux actions related to user authentication
import OAuth from '../components/OAuth'; // Importing OAuth component

// Function component for signing in
export default function SignIn() {
  // State management using useState hook
  const [formData, setFormData] = useState({}); // State for form data
  // Selecting loading state and error message from Redux store
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  // Getting dispatch function from Redux
  const dispatch = useDispatch();
  // Getting navigate function from React Router
  const navigate = useNavigate();

  // Function to handle change in form inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validating form data
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields')); // Dispatching failure action if form data is incomplete
    }
    try {
      dispatch(signInStart()); // Dispatching start action for sign in process
      // Sending sign in request to server
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json(); // Parsing response data
      if (data.success === false) {
        dispatch(signInFailure(data.message)); // Dispatching failure action if sign in was unsuccessful
      }
      if (res.ok) {
        dispatch(signInSuccess(data)); // Dispatching success action if sign in was successful
        navigate('/'); // Redirecting to home page after successful sign in
      }
    } catch (error) {
      dispatch(signInFailure(error.message)); // Dispatching failure action if an error occurred during sign in process
    }
  };

  // Rendering sign in form
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1'>
          <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
            {/* Email input field */}
            <div>
              <Label value='Your email' />
              <TextInput
                type='email'
                placeholder='name@company.com'
                id='email'
                onChange={handleChange}
              />
            </div>
            {/* Password input field */}
            <div>
              <Label value='Your password' />
              <TextInput
                type='password'
                placeholder='**********'
                id='password'
                onChange={handleChange}
              />
            </div>
            {/* Sign in button */}
            <Button
              gradientDuoTone='purpleToPink'
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign In'
              )}
            </Button>
            {/* OAuth component for social media login */}
            <OAuth />
          </form>
          {/* Link to sign up page */}
          <div className='flex gap-2 text-sm mt-5'>
            <span>Dont Have an account?</span>
            <Link to='/sign-up' className='text-blue-500'>
              Sign Up
            </Link>
          </div>
          {/* Displaying error message if sign in fails */}
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
