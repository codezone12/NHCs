import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Edit, Trash2, ToggleLeft, ToggleRight, Filter, Key } from 'lucide-react';

const UserRow = ({ user, isSelected, onSelect, onToggleStatus, onEditUser, onDeleteUser, onChangePassword, onQuickFilter }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
        setConfirmDelete(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getStatusClassName = (isActive) => {
    return isActive 
      ? 'bg-green-100 text-green-800'
      : 'bg-gray-100 text-gray-800';
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) {
      setConfirmDelete(false);
    }
  };

  const handleDeleteClick = () => {
    if (confirmDelete) {
      onDeleteUser(user.id);
      setMenuOpen(false);
      setConfirmDelete(false);
    } else {
      setConfirmDelete(true);
    }
  };

  // Generate initials for avatar if no name is provided
  const getInitials = () => {
    if (!user.name) {
      return user?.email?.charAt(0).toUpperCase();
    }
    
    const nameParts = user.name.split(' ');
    if (nameParts.length === 1) {
      return nameParts[0]?.charAt(0).toUpperCase();
    }
    
    return (nameParts[0]?.charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
  };

  // Handle quick filter by role
  const handleRoleFilter = (e) => {
    e.stopPropagation();
    if (onQuickFilter) {
      onQuickFilter('role', user.role);
    }
  };

  // Handle quick filter by status
  const handleStatusFilter = (e) => {
    e.stopPropagation();
    if (onQuickFilter) {
      onQuickFilter('status', user.isActive ? 'active' : 'inactive');
    }
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="checkbox"
          className="h-4 w-4 text-blue-600 rounded"
          checked={isSelected}
          onChange={() => onSelect(user.id)}
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
            {getInitials()}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{user.name || 'No name provided'}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <button 
            onClick={() => onToggleStatus(user.id)}
            className="flex items-center space-x-1 px-2 py-1 rounded-full hover:bg-gray-100 mr-2"
            title={user.isActive ? "Deactivate user" : "Activate user"}
          >
            <span className={`inline-flex text-xs leading-5 font-semibold rounded-full px-2 py-1 ${getStatusClassName(user.isActive)}`}>
              {user.isActive ? 'Active' : 'Inactive'}
            </span>
            {user.isActive ? 
              <ToggleRight size={16} className="text-green-600" /> : 
              <ToggleLeft size={16} className="text-gray-600" />
            }
          </button>
          
          {onQuickFilter && (
            <button
              onClick={handleStatusFilter}
              className="p-1 rounded-full hover:bg-gray-100"
              title={`Filter by ${user.isActive ? 'active' : 'inactive'} status`}
            >
              <Filter size={14} className="text-gray-400 hover:text-blue-500" />
            </button>
          )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-2">{user.role}</span>
          {onQuickFilter && (
            <button
              onClick={handleRoleFilter}
              className="p-1 rounded-full hover:bg-gray-100"
              title={`Filter by ${user.role} role`}
            >
              <Filter size={14} className="text-gray-400 hover:text-blue-500" />
            </button>
          )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(user.createdAt).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {user.timelines}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
        <div ref={menuRef}>
          <button 
            className="text-gray-400 hover:text-gray-500"
            onClick={toggleMenu}
          >
            <MoreHorizontal size={18} />
          </button>
          
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1" role="menu" aria-orientation="vertical">
                <button
                  onClick={() => {
                    onEditUser(user);
                    setMenuOpen(false);
                  }}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  role="menuitem"
                >
                  <Edit size={16} className="mr-2" />
                  Edit User
                </button>
                <button
                  onClick={() => {
                    onChangePassword(user);
                    setMenuOpen(false);
                  }}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  role="menuitem"
                >
                  <Key size={16} className="mr-2" />
                  Change Password
                </button>
                <button
                  onClick={handleDeleteClick}
                  className="flex items-center px-4 py-2 text-sm text-red-700 hover:bg-gray-100 w-full text-left"
                  role="menuitem"
                >
                  <Trash2 size={16} className="mr-2" />
                  {confirmDelete ? 'Confirm Delete?' : 'Delete User'}
                </button>
              </div>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default UserRow;