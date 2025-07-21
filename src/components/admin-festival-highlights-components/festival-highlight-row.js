import React from 'react';
import { Edit, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';

const FestivalHighlightRow = ({ highlight, onEdit, onDelete, onToggleStatus }) => {
  // Truncate text if it's too long
  const truncateText = (text, maxLength = 50) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{highlight.order}</div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm font-medium text-gray-900">{highlight.title}</div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-500">{truncateText(highlight.content)}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{highlight.icon}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            highlight.isActive
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {highlight.isActive ? 'Active' : 'Inactive'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex space-x-2 justify-end">
          <button
            onClick={onEdit}
            className="text-blue-600 hover:text-blue-900"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={onToggleStatus}
            className={`${
              highlight.isActive ? 'text-amber-600 hover:text-amber-900' : 'text-green-600 hover:text-green-900'
            }`}
            title={highlight.isActive ? 'Deactivate' : 'Activate'}
          >
            {highlight.isActive ? (
              <ToggleRight className="w-4 h-4" />
            ) : (
              <ToggleLeft className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={onDelete}
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

export default FestivalHighlightRow;
