// Importing necessary components and hooks from external libraries and local files
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'; // Importing UI components
import { useState } from 'react'; // Importing useState hook from React
import { Link, useNavigate } from 'react-router-dom'; // Importing Link component and useNavigate hook from React Router
import OAuth from '../components/OAuth'; // Importing OAuth component

// Function component for signing up
export default function SignUp() {
  // State management using useState hook
  const [formData, setFormData] = useState({}); // State for form data
  const [errorMessage, setErrorMessage] = useState(null); // State for error message
  const [loading, setLoading] = useState(false); // State for loading state
  const navigate = useNavigate(); // Getting navigate function from React Router

  // Function to handle change in form inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validating form data
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.'); // Setting error message if form data is incomplete
    }
    try {
      setLoading(true); // Setting loading state to true
      setErrorMessage(null); // Clearing previous error message
      // Sending sign up request to server
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json(); // Parsing response data
      if (data.success === false) {
        return setErrorMessage(data.message); // Setting error message if sign up was unsuccessful
      }
      setLoading(false); // Setting loading state to false
      if (res.ok) {
        navigate('/sign-in'); // Redirecting to sign in page after successful sign up
      }
    } catch (error) {
      setErrorMessage(error.message); // Setting error message if an error occurred during sign up process
      setLoading(false); // Setting loading state to false
    }
  };

  // Rendering sign up form
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1'>
          <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
            {/* Username input field */}
            <div>
              <Label value='Your username' />
              <TextInput
                type='text'
                placeholder='Username'
                id='username'
                onChange={handleChange}
              />
            </div>
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
                placeholder='Password'
                id='password'
                onChange={handleChange}
              />
            </div>
            {/* Sign up button */}
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
                'Sign Up'
              )}
            </Button>
            {/* OAuth component for social media login */}
            <OAuth />
          </form>
          {/* Link to sign in page */}
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-blue-500'>
              Sign In
            </Link>
          </div>
          {/* Displaying error message if sign up fails */}
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
