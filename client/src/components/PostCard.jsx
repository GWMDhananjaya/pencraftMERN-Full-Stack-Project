// This component represents a card for displaying a post.
// It takes a 'post' object as a prop.

export default function PostCard({ post }) {

  // Function to strip HTML tags from content
  const stripHtmlTags = (html) => {
    return html.replace(/<\/?p>/g, '');
  };

  return (
    // Main container for the post card
    <div className='group relative w-full border border-teal-400 hover:border-2 h-[250px] overflow-hidden rounded-lg sm:w-[470px] transition-all'>
      {/* Container for post image */}
      <div>
        <img
          src={post.image} // Display post image
          alt='post cover' // Alternative text for image
          className='h-[100px] w-full object-cover group-hover:h-[40px] transition-all duration-300 z-20' // Styling for the image
        />
      </div>
      {/* Container for post title and content */}
      <div className='p-4 flex flex-col gap-2'>
        {/* Post title */}
        <p className='text-lg font-semibold line-clamp-2'>{post.title}</p>
        {/* Post content with HTML tags stripped */}
        <div className='italic text-sm'>{stripHtmlTags(post.content)}</div>
      </div>
    </div>
  );
}
