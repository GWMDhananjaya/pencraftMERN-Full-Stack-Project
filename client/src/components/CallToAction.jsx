// Importing the Button component from 'flowbite-react' library
import { Button } from 'flowbite-react';

// Defining a functional component called CallToAction
export default function CallToAction() {
  return (
    // Container div with flexbox layout, border, rounded corners, and centering
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        {/* Left section */}
        <div className="flex-1 justify-center flex flex-col">
            {/* Heading */}
            <h2 className='text-2xl'>
                Want to learn more about JavaScript?
            </h2>
            {/* Subtitle */}
            <p className='text-gray-500 my-2'>
                Checkout these resources with 100 JavaScript Projects
            </p>
            {/* Button component with a gradient and a link */}
            <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
                {/* Link to the JavaScript projects */}
                <a href="https://www.100jsprojects.com" target='_blank' rel='noopener noreferrer'>
                    100 JavaScript Projects
                </a>
            </Button>
        </div>
        {/* Right section */}
        <div className="p-7 flex-1">
            {/* Image related to JavaScript */}
            <img src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg" />
        </div>
    </div>
  )
}
