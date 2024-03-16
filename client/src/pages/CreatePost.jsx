// Importing necessary components and libraries
import React, { useState } from 'react';
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'; // UI components
import ReactQuill from 'react-quill'; // Rich text editor
import 'react-quill/dist/quill.snow.css'; // Quill editor styles
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'; // Firebase storage related functions
import { app } from '../firebase'; // Firebase app instance
import { CircularProgressbar } from 'react-circular-progressbar'; // Circular progress bar for image upload
import 'react-circular-progressbar/dist/styles.css'; // Circular progress bar styles
import { useNavigate } from 'react-router-dom'; // Navigation hook

// Component for creating a new post
export default function CreatePost() {
  // State variables for managing file upload, image upload progress, form data, and publishing errors
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  // Navigation hook
  const navigate = useNavigate();

  // Function to handle image upload
  const handleUploadImage = async () => {
    try {
      // Check if a file is selected
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }
      // Reset image upload error
      setImageUploadError(null);
      
      // Get Firebase storage instance and generate a unique filename
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      
      // Upload file to Firebase storage
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        // Track upload progress
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        // Handle upload error
        (error) => {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        },
        // On upload completion, get download URL and update form data
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      // Handle upload error
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send form data to server for post creation
      const res = await fetch('/api/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // Check response status and handle errors
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      // Navigate to the created post on successful submission
      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      // Handle submission error
      setPublishError('Something went wrong');
    }
  };

  // JSX for the create post form
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        {/* Input field for post title */}
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-1'
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        {/* File input and upload button for post image */}
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput
            type='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type='button'
            gradientDuoTone='purpleToBlue'
            size='sm'
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className='w-16 h-16'>
                {/* Circular progress bar to show upload progress */}
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )}
          </Button>
        </div>
        {/* Display error message if image upload fails */}
        {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
        {/* Display uploaded image */}
        {formData.image && (
          <img
            src={formData.image}
            alt='upload'
            className='w-full h-72 object-cover'
          />
        )}
        {/* Rich text editor for post content */}
        <ReactQuill
          theme='snow'
          placeholder='Write something...'
          className='h-72 mb-12'
          required
          id='content'
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        {/* Button to submit the form */}
        <Button type='submit' gradientDuoTone='purpleToPink'>
          Publish
        </Button>
        {/* Display error message if form submission fails */}
        {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
