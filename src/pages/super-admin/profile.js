import React, { useState, useEffect, useCallback } from 'react';
import { User, Mail, Calendar, Save, AlertCircle, Eye, EyeOff, Lock } from 'lucide-react';
import { useUserServices } from '../../apis/userService';
import { toast } from 'react-toastify';
import UpdatePasswordModal from '../../components/admin-users-components/update-password-modal';

const AdminProfilePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [profile, setProfile] = useState({
    id: '',
    name: '',
    email: '',
    role: '',
    isActive: true,
    isVerified: false,
    joinDate: '',
    createdAt: '',
    updatedAt: '',
    avatar: '/images/newImages/profile-placeholder.jpg'
  });
  const [editedProfile, setEditedProfile] = useState({...profile});
  
  const { getUser, updateUser, loading, error } = useUserServices();
  
  // Get user ID from local storage
  const getUserId = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.id;
  };
  
  // Fetch user profile with useCallback to prevent recreation on each render
  const fetchUserProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      const userId = getUserId();
      if (!userId) {
        toast.error('User not found. Please log in again.');
        return;
      }
      
      const rawdata = await getUser(userId);
      
      const userData = rawdata.data
      
      // Format join date
      const joinDate = new Date(userData.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      setProfile({
        id: userData.id,
        name: userData.name || '',
        email: userData.email || '',
        role: userData.role || 'ADMIN',
        isActive: userData.isActive,
        isVerified: userData.isVerified,
        joinDate,
        createdAt: userData.createdAt,
        updatedAt: userData.updatedAt,
        avatar: '/images/newImages/profile-placeholder.jpg'
      });
      
      setEditedProfile({
        id: userData.id,
        name: userData.name || '',
        email: userData.email || '',
        role: userData.role || 'ADMIN',
        isActive: userData.isActive,
        isVerified: userData.isVerified,
        joinDate,
        createdAt: userData.createdAt,
        updatedAt: userData.updatedAt,
        avatar: '/images/newImages/profile-placeholder.jpg'
      });
    } catch (err) {
      console.error('Error fetching profile:', err);
      toast.error('Failed to load profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []); // Empty dependency array to prevent infinite loops
  
  // Use the memoized fetchUserProfile function in useEffect
  useEffect(() => {
    fetchUserProfile();
  }, []); // Empty dependency array to run only once on mount

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({
      ...editedProfile,
      [name]: value
    });
  };

  const handleSaveProfile = async () => {
    try {
      const userId = getUserId();
      if (!userId) {
        toast.error('User not found. Please log in again.');
        return;
      }
      
      // Prepare data for API - only send name as that's the only editable field
      const userData = {
        name: editedProfile.name
      };
      
      await updateUser(userId, userData);
      setProfile({...profile, name: editedProfile.name});
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
      toast.error('Failed to update profile. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setEditedProfile({...profile});
    setIsEditing(false);
  };

  const handlePasswordUpdated = () => {
    toast.success('Password updated successfully!');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
        <p className="text-gray-500">View and manage your admin profile information</p>
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
                      e.target.style.display = 'none';
                      e.target.parentNode.classList.add('bg-blue-600', 'text-white', 'flex', 'items-center', 'justify-center');
                      // Create a text node with the first letter of the name
                      const nameInitial = document.createElement('span');
                      nameInitial.className = 'text-5xl font-bold';
                      nameInitial.textContent = profile.name ? profile.name?.charAt(0).toUpperCase() : 'A';
                      e.target.parentNode.appendChild(nameInitial);
                    }}
                  />
                </div>
              </div>
              <h2 className="mt-4 text-xl font-semibold text-gray-800">{profile.name}</h2>
              <p className="text-gray-500">{profile.role?.charAt(0) + profile.role.slice(1).toLowerCase()}</p>
              <div className="mt-4 w-full">
                <div className="flex items-center py-2">
                  <Mail size={16} className="text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">{profile.email}</span>
                </div>
                <div className="flex items-center py-2">
                  <Calendar size={16} className="text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">Joined {profile.joinDate}</span>
                </div>
                <div className="flex items-center py-2">
                  <User size={16} className="text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">Status: {profile.isActive ? 'Active' : 'Inactive'}</span>
                </div>
              </div>
            </div>
            {!isEditing && (
              <button 
                onClick={() => setIsEditing(true)}
                className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
              >
                Edit Profile
              </button>
            )}
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={editedProfile.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled
                    />
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>
                  <div className="flex space-x-4 pt-4">
                    <button
                      onClick={handleSaveProfile}
                      disabled={loading}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={16} className="mr-2" /> Save Changes
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                  </div>
                  {error && (
                    <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md flex items-center">
                      <AlertCircle size={16} className="mr-2" />
                      {error}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Profile Details View
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Details</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Account Information</h4>
                    <div className="mt-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Full Name</p>
                        <p className="text-gray-800">{profile.name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="text-gray-800">{profile.email}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Role</p>
                        <p className="text-gray-800">{profile.role?.charAt(0) + profile.role.slice(1).toLowerCase()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Joined</p>
                        <p className="text-gray-800">{profile.joinDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Status</p>
                        <p className="text-gray-800">{profile.isActive ? 'Active' : 'Inactive'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Verified</p>
                        <p className="text-gray-800">{profile.isVerified ? 'Yes' : 'No'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Last Updated</p>
                        <p className="text-gray-800">{new Date(profile.updatedAt).toLocaleDateString()}</p>
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
                <button 
                  onClick={() => setIsPasswordModalOpen(true)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 flex items-center"
                >
                  <Lock size={16} className="mr-2" /> Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Password Update Modal */}
      {isPasswordModalOpen && (
        <UpdatePasswordModal 
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
          user={profile}
          onPasswordUpdated={handlePasswordUpdated}
        />
      )}
    </>
  );
};

export default AdminProfilePage;
