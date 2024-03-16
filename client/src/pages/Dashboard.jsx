import { useEffect, useState } from 'react'; // Importing necessary hooks from React
import { useLocation } from 'react-router-dom'; // Importing useLocation hook from React Router
import DashSidebar from '../components/DashSidebar'; // Importing DashSidebar component
import DashProfile from '../components/DashProfile'; // Importing DashProfile component
import DashPosts from '../components/DashPosts'; // Importing DashPosts component

// Exporting default Dashboard function component
export default function Dashboard() {
  const location = useLocation(); // Extracting current location using useLocation hook
  const [tab, setTab] = useState(''); // State to manage currently active tab

  useEffect(() => { // useEffect to handle tab changes based on URL parameters
    const urlParams = new URLSearchParams(location.search); // Extracting URL parameters
    const tabFromUrl = urlParams.get('tab'); // Getting 'tab' parameter from URL
    if (tabFromUrl) { // If 'tab' parameter exists in URL
      setTab(tabFromUrl); // Set the 'tab' state to the value from URL
    }
  }, [location.search]); // Running the effect whenever the 'location.search' changes

  return (
    <div className='min-h-screen flex flex-col md:flex-row'> {/* Outer container with flex layout */}
      <div className='md:w-56'> {/* Sidebar container */}
        <DashSidebar /> {/* Rendering DashSidebar component */}
      </div>
      {tab === 'profile' && <DashProfile/>} {/* Rendering DashProfile component if tab is 'profile' */}
      {tab === 'posts' && <DashPosts/>} {/* Rendering DashPosts component if tab is 'posts' */}
    </div>
  );
}
