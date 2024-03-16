// Import necessary components and functions from libraries and files
import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

// Define a React component for OAuth authentication with Google
export default function OAuth() {
    // Get the Firebase authentication instance and Redux dispatch function
    const auth = getAuth(app)
    const dispatch = useDispatch()
    // Get the navigation function from React Router
    const navigate = useNavigate()

    // Function to handle Google button click for authentication
    const handleGoogleClick = async () =>{
        // Create a new instance of GoogleAuthProvider for authentication
        const provider = new GoogleAuthProvider()
        // Customize authentication prompt to select account
        provider.setCustomParameters({ prompt: 'select_account' })
        try {
            // Sign in with Google using Firebase authentication popup
            const resultsFromGoogle = await signInWithPopup(auth, provider)
            // Send user data to server for further processing
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoUrl: resultsFromGoogle.user.photoURL,
                }),
            })
            // Parse server response
            const data = await res.json()
            // If authentication and data transfer are successful, dispatch sign-in success action and navigate to home
            if (res.ok){
                dispatch(signInSuccess(data))
                navigate('/')
            }
        } catch (error) {
            // Log any errors that occur during the process
            console.log(error);
        }
    } 

    // Render a button with Google authentication functionality
    return (
        <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
            <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
            Continue with Google
        </Button>
    )
}
