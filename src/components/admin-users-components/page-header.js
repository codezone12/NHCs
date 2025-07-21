import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';

const PageHeader = ({ onAddUser }) => {

  return(
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
    <button 
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
      onClick={onAddUser}
    >
      <UserPlus size={16} className="mr-2" />
      Add User
    </button>
  </div>
)};

export default PageHeader;