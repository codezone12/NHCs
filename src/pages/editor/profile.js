import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Save, Camera, X } from 'lucide-react';

const EditorProfilePage = () => {
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@newswebsite.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    bio: 'Senior editor with over 10 years of experience in technology and science journalism. Previously worked at Tech Today and Science Weekly.',
    joinDate: 'January 15, 2022',
    expertise: ['Technology', 'Science', 'Environment', 'Health'],
    avatar: '/images/newImages/profile-placeholder.jpg'
  });

  const [newExpertise, setNewExpertise] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({...profile});

  const handleAddExpertise = () => {
    if (newExpertise.trim() !== '' && !editedProfile.expertise.includes(newExpertise.trim())) {
      setEditedProfile({
        ...editedProfile,
        expertise: [...editedProfile.expertise, newExpertise.trim()]
      });
      setNewExpertise('');
    }
  };

  const handleRemoveExpertise = (item) => {
    setEditedProfile({
      ...editedProfile,
      expertise: editedProfile.expertise.filter(exp => exp !== item)
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({
      ...editedProfile,
      [name]: value
    });
  };

  const handleSaveProfile = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    // Here you would typically make an API call to update the profile
    alert('Profile updated successfully!');
  };

  const handleCancelEdit = () => {
    setEditedProfile({...profile});
    setIsEditing(false);
  };

  return (
    <>
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
        <p className="text-gray-500">View and manage your profile information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Summary Card */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  <img 
                    src={profile.avatar} 
                    alt={profile.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/128?text=Editor';
                    }}
                  />
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full hover:bg-green-700">
                    <Camera size={16} />
                  </button>
                )}
              </div>
              <h2 className="mt-4 text-xl font-semibold text-gray-800">{profile.name}</h2>
              <p className="text-gray-500">Editor</p>
              <div className="mt-4 w-full">
                <div className="flex items-center py-2">
                  <Mail size={16} className="text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">{profile.email}</span>
                </div>
                <div className="flex items-center py-2">
                  <Phone size={16} className="text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">{profile.phone}</span>
                </div>
                <div className="flex items-center py-2">
                  <MapPin size={16} className="text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">{profile.location}</span>
                </div>
                <div className="flex items-center py-2">
                  <Calendar size={16} className="text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">Joined {profile.joinDate}</span>
                </div>
              </div>
            </div>
            {!isEditing && (
              <button 
                onClick={() => setIsEditing(true)}
                className="mt-4 w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
              >
                Edit Profile
              </button>
            )}
          </div>

          {/* Expertise Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Areas of Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {profile.expertise.map((item, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Details / Edit Form */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            {isEditing ? (
              // Edit Form
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Edit Profile</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editedProfile.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={editedProfile.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={editedProfile.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={editedProfile.location}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                      name="bio"
                      value={editedProfile.bio}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Areas of Expertise</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {editedProfile.expertise.map((item, index) => (
                        <div 
                          key={index} 
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center"
                        >
                          {item}
                          <button 
                            onClick={() => handleRemoveExpertise(item)}
                            className="ml-1 text-green-800 hover:text-green-900"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex">
                      <input
                        type="text"
                        value={newExpertise}
                        onChange={(e) => setNewExpertise(e.target.value)}
                        placeholder="Add new expertise"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <button
                        onClick={handleAddExpertise}
                        className="px-4 py-2 bg-green-600 text-white rounded-r-md hover:bg-green-700"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                  <div className="flex space-x-4 pt-4">
                    <button
                      onClick={handleSaveProfile}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
                    >
                      <Save size={16} className="mr-2" /> Save Changes
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Profile Details View
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Details</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">About Me</h4>
                    <p className="mt-1 text-gray-800">{profile.bio}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Contact Information</h4>
                    <div className="mt-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="text-gray-800">{profile.email}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Phone</p>
                        <p className="text-gray-800">{profile.phone}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Location</p>
                        <p className="text-gray-800">{profile.location}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Joined</p>
                        <p className="text-gray-800">{profile.joinDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Account Security Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Security</h3>
            <div className="space-y-4">
              <div>
                <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                  Change Password
                </button>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Two-Factor Authentication</h4>
                <div className="flex items-center">
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input 
                      type="checkbox" 
                      name="toggle" 
                      id="toggle" 
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    />
                    <label 
                      htmlFor="toggle" 
                      className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                    ></label>
                  </div>
                  <label htmlFor="toggle" className="text-sm text-gray-700">Enable two-factor authentication</label>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Add an extra layer of security to your account by requiring a verification code in addition to your password.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add some custom CSS for the toggle switch */}
      <style jsx>{`
        .toggle-checkbox:checked {
          right: 0;
          border-color: #10B981;
        }
        .toggle-checkbox:checked + .toggle-label {
          background-color: #10B981;
        }
        .toggle-checkbox {
          right: 0;
          transition: all 0.3s;
        }
        .toggle-label {
          transition: all 0.3s;
        }
      `}</style>
    </>
  );
};

export default EditorProfilePage;