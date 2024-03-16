/*
  This component represents the About page of the Pencraft website.
  It provides information about Pencraft, an author's vlog dedicated to sharing insights, tips, and experiences in the world of writing and publishing.
  It is designed to be a central destination for inspiration and knowledge for both aspiring writers and seasoned authors.
*/

export default function About() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      {/* Container for About content */}
      <div className='max-w-2xl mx-auto p-5 text-center'>
        <div>
          {/* Title */}
          <h1 className='text-3xl font font-semibold text-center my-1'>
            About Pencraft
          </h1>
          {/* Description */}
          <div className='text-md text-gray-500 flex flex-col gap-6'>
            <p>
              Pencraft is an author's vlog dedicated to sharing insights, tips, and experiences in the world of writing and publishing. Whether you're an aspiring writer or a seasoned author, Pencraft is your go-to destination for inspiration and knowledge.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
