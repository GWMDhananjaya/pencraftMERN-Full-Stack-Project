// Importing necessary components from react-redux and react-router-dom
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

// Defining a functional component named PrivateRoute
export default function PrivateRoute() {
  // Extracting currentUser from the Redux store state using useSelector hook
  const { currentUser } = useSelector((state) => state.user);
  
  // Returning Outlet component if currentUser is truthy, otherwise redirecting to '/sign-in' route using Navigate component
  return currentUser ? <Outlet /> : <Navigate to='/sign-in' />;
}
