import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

// Component for rendering the home page
export default function Home() {
  // State to hold the fetched posts
  const [posts, setPosts] = useState([]);

  // Effect hook to fetch posts when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      // Fetch posts from the server
      const res = await fetch('/api/post/getPosts');
      // Parse the response as JSON
      const data = await res.json();
      // Set the fetched posts to the state
      setPosts(data.posts);
    };
    // Call the fetchPosts function when the component mounts
    fetchPosts();
  }, []); // Empty dependency array to ensure the effect runs only once

  // JSX for rendering the home page
  return (
    <div> 
      {/* Introduction section */}
      <div className='min-h-screen flex flex-col gap-4 p-60 px-12 max-w-6x1 mx-auto '>
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to <br/>Pencraft</h1>
        <p className='text-gray-400 text-xs sm:text-sm'>
          Pencraft is an author's vlog dedicated to sharing insights, tips, and experiences 
          in the world of writing and publishing. <br/>Whether you're an aspiring writer or a seasoned author, Pencraft is your go-to destination for inspiration and knowledge
        </p>
      </div>

      {/* Placeholder section */}
      <div className='p-3 bg-amber-100 dark:bg-slate-700'></div>

      {/* Section to display recent posts */}
      <div className='max-w-6x1 mx-auto p- flex flex-col gap-8 py-7'>
        {/* Check if posts exist and have length */}
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-8'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex flex-wrap gap-4'>
              {/* Map through posts and render PostCard component for each */}
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
