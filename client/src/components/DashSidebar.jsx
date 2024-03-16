// Importing necessary components and libraries
import { Sidebar } from 'flowbite-react';
import {
  HiArrowCircleRight,
  HiDocument,
  HiDocumentText,
  HiUser,
} from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

// Default export for the Dashboard Sidebar component
export default function DashSidebar() {
  // Getting the current location
  const location = useLocation();
  // Dispatch function for Redux actions
  const dispatch = useDispatch();
  // State to manage the active tab
  const [tab, setTab] = useState('');
  
  // Effect to update the active tab based on URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  // Function to handle user sign out
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

  // Rendering the Dashboard Sidebar component
  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-1'>
          {/* Link to the user profile page */}
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item 
              active={tab === 'profile'} 
              icon={HiUser} 
              label={'User'} 
              labelColor="dark"
              as='div'
            >
              Profile
            </Sidebar.Item>
          </Link>
          {/* Link to the user posts page */}
          <Link to="/dashboard?tab=posts">
            <Sidebar.Item 
              active={tab == 'posts'} 
              icon={HiDocumentText} 
              as='div'
            >
              Writings
            </Sidebar.Item>
          </Link>
          {/* Sign out option */}
          <Sidebar.Item icon={HiArrowCircleRight} className="cursor-pointer" onClick={handleSignout}>
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
