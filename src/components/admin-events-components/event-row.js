import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Edit, Trash2, ToggleLeft, ToggleRight, MapPin, Globe } from 'lucide-react';

const EventRow = ({ event, isSelected, onSelect, onToggleStatus, onEditEvent, onDeleteEvent }) => {
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
      onDeleteEvent(event.id);
      setMenuOpen(false);
      setConfirmDelete(false);
    } else {
      setConfirmDelete(true);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Format time for display
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(undefined, { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  // Get event image or placeholder
  const getEventImage = () => {
    if (event.imageUrl) {
      return (
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="h-10 w-10 rounded-md object-cover"
        />
      );
    }
    
    return (
      <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center text-blue-600">
        <span className="text-lg font-bold">{event.title.charAt(0)}</span>
      </div>
    );
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="checkbox"
          className="h-4 w-4 text-blue-600 rounded"
          checked={isSelected}
          onChange={() => onSelect(event.id)}
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {getEventImage()}
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{event.title}</div>
            <div className="text-xs text-gray-500 line-clamp-1 max-w-xs">
              {event.description}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <span className={`inline-flex text-xs leading-5 font-semibold rounded-full px-2 py-1 ${getStatusClassName(event.isActive)}`}>
            {event.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{formatDate(event.date)}</div>
        <div className="text-xs text-gray-500">{formatTime(event.date)}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {event.isOnline ? (
            <Globe size={16} className="text-blue-500 mr-1" />
          ) : (
            <MapPin size={16} className="text-red-500 mr-1" />
          )}
          <span className="text-sm text-gray-500">
            {event.isOnline ? 'Online' : (event.location || 'No location')}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatDate(event.createdAt)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex space-x-2 justify-end">
          <button
            onClick={() => onEditEvent(event)}
            className="text-blue-600 hover:text-blue-900"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onToggleStatus(event.id)}
            className={`${event.isActive ? 'text-amber-600 hover:text-amber-900' : 'text-green-600 hover:text-green-900'}`}
            title={event.isActive ? 'Deactivate' : 'Activate'}
          >
            {event.isActive ? (
              <ToggleRight className="w-4 h-4" />
            ) : (
              <ToggleLeft className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={() => onDeleteEvent(event.id)}
            className="text-red-600 hover:text-red-900"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default EventRow;
