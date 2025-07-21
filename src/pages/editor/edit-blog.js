import React from 'react';
import AddBlog from './add-blog';

// This component reuses the AddBlog component in edit mode
const EditBlog = () => {
  return <AddBlog />;
};

export default EditBlog;
