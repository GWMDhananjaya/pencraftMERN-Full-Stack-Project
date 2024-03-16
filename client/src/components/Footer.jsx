// Importing necessary components and icons from external libraries
import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';

// Define a functional component for the Footer
export default function FooterCom() {
  return (
    // Footer component with a custom container class and border styling
    <Footer container className='border border-t-8 border-teal-500'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
          {/* Section for the logo */}
          <div className='mt-5'>
            {/* Link to the homepage */}
            <Link
              to='/'
              className='self-center whitespace-nowrap text-lg sm:text-3xl font-semibold dark:text-white'
            >
              Pencraft
            </Link>
          </div>
          {/* Section for various links */}
          <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
            {/* About section */}
            <div>
              <Footer.Title title='About' />
              <Footer.LinkGroup col>
                {/* Link to the About page */}
                <Footer.Link
                  href='/about'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Pencraft
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            {/* Follow us section */}
            <div>
              <Footer.Title title='Follow us' />
              <Footer.LinkGroup col>
                {/* Placeholder link */}
                <Footer.Link href='#'>Discord</Footer.Link>
              </Footer.LinkGroup>
            </div>
            {/* Legal section */}
            <div>
              <Footer.Title title='Legal' />
              <Footer.LinkGroup col>
                {/* Placeholder legal links */}
                <Footer.Link href='#'>Privacy Policy</Footer.Link>
                <Footer.Link href='#'>Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        {/* Divider line */}
        <Footer.Divider />
        {/* Section for copyright and social media icons */}
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          {/* Copyright notice */}
          <Footer.Copyright
            href='#'
            by="PenCraft"
            year={new Date().getFullYear()}
          />
          {/* Social media icons */}
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            {/* Facebook icon */}
            <Footer.Icon href='#' icon={BsFacebook}/>
            {/* Instagram icon */}
            <Footer.Icon href='#' icon={BsInstagram}/>
            {/* Twitter icon */}
            <Footer.Icon href='#' icon={BsTwitter}/>
            {/* GitHub icon */}
            <Footer.Icon href='#' icon={BsGithub}/>
            {/* Dribbble icon */}
            <Footer.Icon href='#' icon={BsDribbble}/>
          </div>
        </div>
      </div>
    </Footer>
  );
}
