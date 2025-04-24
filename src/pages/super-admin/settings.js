import React, { useState } from 'react';
import { 
  Save, 
  User, 
  Bell, 
  Lock, 
  Palette, 
  Globe, 
  Shield, 
  CreditCard, 
  Users, 
  ExternalLink, 
  Mail, 
  ToggleLeft, 
  ToggleRight,
  Moon,
  Sun,
  ChevronRight,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

const SettingsPage = () => {
  // Active settings section
  const [activeSection, setActiveSection] = useState('profile');
  
  // Toggle states
  const [toggles, setToggles] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: false,
    twoFactorAuth: true,
    darkMode: false,
    autoSave: true,
    publicProfile: false,
    dataCollection: true
  });

  // Form states
  const [profileForm, setProfileForm] = useState({
    name: 'Michael Scott',
    email: 'michael@example.com',
    timezone: 'America/New_York',
    language: 'en',
    bio: 'Regional Manager at Dunder Mifflin Paper Company'
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Handle toggle changes
  const handleToggle = (key) => {
    setToggles({
      ...toggles,
      [key]: !toggles[key]
    });
  };

  // Handle profile form changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm({
      ...profileForm,
      [name]: value
    });
  };

  // Handle password form changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({
      ...passwordForm,
      [name]: value
    });
  };

  // Sidebar navigation items
  const navigationItems = [
    { id: 'profile', label: 'Profile', icon: <User size={18} /> },
    { id: 'account', label: 'Account', icon: <Shield size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette size={18} /> },
    { id: 'security', label: 'Security & Privacy', icon: <Lock size={18} /> },
    { id: 'billing', label: 'Billing', icon: <CreditCard size={18} /> },
    { id: 'team', label: 'Team', icon: <Users size={18} /> },
    { id: 'integrations', label: 'Integrations', icon: <ExternalLink size={18} /> },
  ];

  // Render active section content
  const renderSectionContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Profile Settings</h2>
            
            {/* Avatar */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
              <div className="flex items-center">
                <div className="h-16 w-16 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center text-white text-xl font-medium">
                  MS
                </div>
                <div className="ml-5">
                  <button className="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Change
                  </button>
                  <button className="ml-2 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    Remove
                  </button>
                </div>
              </div>
            </div>
            
            {/* Profile Form */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={profileForm.name}
                      onChange={handleProfileChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={profileForm.email}
                      onChange={handleProfileChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                    Language
                  </label>
                  <div className="mt-1">
                    <select
                      id="language"
                      name="language"
                      value={profileForm.language}
                      onChange={handleProfileChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="en">English (US)</option>
                      <option value="en-gb">English (UK)</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
                    Timezone
                  </label>
                  <div className="mt-1">
                    <select
                      id="timezone"
                      name="timezone"
                      value={profileForm.timezone}
                      onChange={handleProfileChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="America/New_York">Eastern Time (US & Canada)</option>
                      <option value="America/Chicago">Central Time (US & Canada)</option>
                      <option value="America/Denver">Mountain Time (US & Canada)</option>
                      <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                      <option value="Europe/London">London</option>
                      <option value="Europe/Paris">Paris</option>
                      <option value="Asia/Tokyo">Tokyo</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                    Bio
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="bio"
                      name="bio"
                      rows={3}
                      value={profileForm.bio}
                      onChange={handleProfileChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Brief description for your profile.
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Save size={16} className="mr-2" />
                  Save
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'account':
        return (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Account Settings</h2>
            
            <div className="border border-gray-200 rounded-md divide-y divide-gray-200">
              {/* Account Type */}
              <div className="p-4 flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Account Type</h3>
                  <p className="text-sm text-gray-500">You are currently on the Pro plan</p>
                </div>
                <button className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Upgrade
                </button>
              </div>
              
              {/* Username */}
              <div className="p-4 flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Username</h3>
                  <p className="text-sm text-gray-500">@michael.scott</p>
                </div>
                <button className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Change
                </button>
              </div>
              
              {/* Auto Save */}
              <div className="p-4 flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Auto Save</h3>
                  <p className="text-sm text-gray-500">Automatically save timeline changes</p>
                </div>
                <button 
                  className="text-gray-400 hover:text-gray-500"
                  onClick={() => handleToggle('autoSave')}
                >
                  {toggles.autoSave ? <ToggleRight size={24} className="text-blue-600" /> : <ToggleLeft size={24} />}
                </button>
              </div>
              
              {/* Public Profile */}
              <div className="p-4 flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Public Profile</h3>
                  <p className="text-sm text-gray-500">Make your profile visible to others</p>
                </div>
                <button 
                  className="text-gray-400 hover:text-gray-500"
                  onClick={() => handleToggle('publicProfile')}
                >
                  {toggles.publicProfile ? <ToggleRight size={24} className="text-blue-600" /> : <ToggleLeft size={24} />}
                </button>
              </div>
              
              {/* Data Collection */}
              <div className="p-4 flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Data Collection</h3>
                  <p className="text-sm text-gray-500">Allow us to collect usage data to improve your experience</p>
                </div>
                <button 
                  className="text-gray-400 hover:text-gray-500"
                  onClick={() => handleToggle('dataCollection')}
                >
                  {toggles.dataCollection ? <ToggleRight size={24} className="text-blue-600" /> : <ToggleLeft size={24} />}
                </button>
              </div>
            </div>
            
            {/* Danger Zone */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-red-600 mb-4">Danger Zone</h3>
              <div className="border border-red-200 rounded-md bg-red-50 p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-medium text-red-800">Delete Account</h4>
                    <p className="text-sm text-red-700">This action cannot be undone. All your data will be permanently removed.</p>
                  </div>
                  <button className="bg-white py-2 px-4 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 hover:bg-red-100">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'notifications':
        return (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Notification Settings</h2>
            
            <div className="border border-gray-200 rounded-md divide-y divide-gray-200">
              {/* Email Notifications */}
              <div className="p-4 flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                  <p className="text-sm text-gray-500">Receive notifications via email</p>
                </div>
                <button 
                  className="text-gray-400 hover:text-gray-500"
                  onClick={() => handleToggle('emailNotifications')}
                >
                  {toggles.emailNotifications ? <ToggleRight size={24} className="text-blue-600" /> : <ToggleLeft size={24} />}
                </button>
              </div>
              
              {/* Push Notifications */}
              <div className="p-4 flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Push Notifications</h3>
                  <p className="text-sm text-gray-500">Receive notifications on your device</p>
                </div>
                <button 
                  className="text-gray-400 hover:text-gray-500"
                  onClick={() => handleToggle('pushNotifications')}
                >
                  {toggles.pushNotifications ? <ToggleRight size={24} className="text-blue-600" /> : <ToggleLeft size={24} />}
                </button>
              </div>
              
              {/* Marketing Emails */}
              <div className="p-4 flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Marketing Emails</h3>
                  <p className="text-sm text-gray-500">Receive updates about new features and offers</p>
                </div>
                <button 
                  className="text-gray-400 hover:text-gray-500"
                  onClick={() => handleToggle('marketingEmails')}
                >
                  {toggles.marketingEmails ? <ToggleRight size={24} className="text-blue-600" /> : <ToggleLeft size={24} />}
                </button>
              </div>
            </div>
            
            {/* Notification Preferences */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Notification Preferences</h3>
              <div className="bg-white rounded-md border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Event
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Push
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Timeline Updates
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" defaultChecked />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" defaultChecked />
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Comments
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" defaultChecked />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Mentions
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" defaultChecked />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" defaultChecked />
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Team Invites
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" defaultChecked />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" defaultChecked />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      
      case 'appearance':
        return (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Appearance Settings</h2>
            
            {/* Theme Selector */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Theme</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className={`border rounded-md p-4 cursor-pointer ${!toggles.darkMode ? 'ring-2 ring-blue-500' : 'border-gray-200'}`}
                  onClick={() => setToggles({...toggles, darkMode: false})}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Sun size={18} className="text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">Light</span>
                    </div>
                    {!toggles.darkMode && <div className="h-4 w-4 rounded-full bg-blue-600"></div>}
                  </div>
                  <div className="h-20 bg-gray-100 rounded-md border border-gray-200"></div>
                </div>
                
                <div className={`border rounded-md p-4 cursor-pointer ${toggles.darkMode ? 'ring-2 ring-blue-500' : 'border-gray-200'}`}
                  onClick={() => setToggles({...toggles, darkMode: true})}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Moon size={18} className="text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">Dark</span>
                    </div>
                    {toggles.darkMode && <div className="h-4 w-4 rounded-full bg-blue-600"></div>}
                  </div>
                  <div className="h-20 bg-gray-800 rounded-md border border-gray-700"></div>
                </div>
                
                <div className="border border-gray-200 rounded-md p-4 cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="text-gray-400 mr-2 w-[18px] h-[18px] flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M22 12H23M1 12H2M12 22V23M12 1V2M19.8 19.8L18.8 18.8M5.2 5.2L4.2 4.2M19.8 4.2L18.8 5.2M5.2 18.8L4.2 19.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-gray-900">System</span>
                    </div>
                  </div>
                  <div className="h-20 bg-gradient-to-r from-gray-100 to-gray-800 rounded-md border border-gray-200"></div>
                </div>
              </div>
            </div>
            
            {/* Color Scheme */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Primary Color</h3>
              <div className="grid grid-cols-6 gap-2">
                <div className="h-8 w-8 rounded-full bg-blue-600 ring-2 ring-blue-600 ring-offset-2 cursor-pointer"></div>
                <div className="h-8 w-8 rounded-full bg-purple-600 cursor-pointer"></div>
                <div className="h-8 w-8 rounded-full bg-pink-600 cursor-pointer"></div>
                <div className="h-8 w-8 rounded-full bg-red-600 cursor-pointer"></div>
                <div className="h-8 w-8 rounded-full bg-orange-600 cursor-pointer"></div>
                <div className="h-8 w-8 rounded-full bg-green-600 cursor-pointer"></div>
              </div>
            </div>
            
            {/* Layout Density */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Layout Density</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="border border-gray-200 rounded-md p-4 cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">Compact</span>
                  </div>
                  <div className="h-20 bg-white rounded-md border border-gray-200 flex flex-col justify-center items-center">
                    <div className="w-3/4 h-2 bg-gray-200 rounded-full mb-1"></div>
                    <div className="w-3/4 h-2 bg-gray-200 rounded-full mb-1"></div>
                    <div className="w-3/4 h-2 bg-gray-200 rounded-full mb-1"></div>
                    <div className="w-3/4 h-2 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-md p-4 cursor-pointer ring-2 ring-blue-500">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">Default</span>
                    <div className="h-4 w-4 rounded-full bg-blue-600"></div>
                  </div>
                  <div className="h-20 bg-white rounded-md border border-gray-200 flex flex-col justify-center items-center">
                    <div className="w-3/4 h-2 bg-gray-200 rounded-full mb-2"></div>
                    <div className="w-3/4 h-2 bg-gray-200 rounded-full mb-2"></div>
                    <div className="w-3/4 h-2 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-md p-4 cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">Comfortable</span>
                  </div>
                  <div className="h-20 bg-white rounded-md border border-gray-200 flex flex-col justify-center items-center">
                    <div className="w-3/4 h-3 bg-gray-200 rounded-full mb-3"></div>
                    <div className="w-3/4 h-3 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Font Size */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Font Size</h3>
              <div className="w-full max-w-md">
                <input 
                  type="range" 
                  min="1" 
                  max="5" 
                  defaultValue="3" 
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Small</span>
                  <span>Medium</span>
                  <span>Large</span>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'security':
        return (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Security & Privacy Settings</h2>
            
            {/* Password Change */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Change Password</h3>
              <div className="bg-white p-4 rounded-md border border-gray-200">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                      Current Password
                    </label>
                    <div className="mt-1">
                      <input
                        type="password"
                        name="currentPassword"
                        id="currentPassword"
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <div className="mt-1">
                      <input
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirm New Password
                    </label>
                    <div className="mt-1">
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Two-Factor Authentication */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h3>
                <button 
                  className="text-gray-400 hover:text-gray-500"
                  onClick={() => handleToggle('twoFactorAuth')}
                >
                  {toggles.twoFactorAuth ? <ToggleRight size={24} className="text-blue-600" /> : <ToggleLeft size={24} />}
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Add an extra layer of security to your account by requiring both your password and a verification code.
              </p>
              {toggles.twoFactorAuth && (
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <AlertCircle size={20} className="text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Two-factor authentication is enabled</h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <p>Your account is protected with an authenticator app.</p>
                      </div>
                      <div className="mt-4">
                        <button className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                          Reconfigure
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Session Management */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Active Sessions</h3>
              <div className="bg-white border border-gray-200 rounded-md divide-y divide-gray-200">
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <h4 className="text-sm font-medium text-gray-900">Current Session</h4>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Windows • Chrome • New York, USA</p>
                      <p className="text-xs text-gray-400 mt-1">Started 2 hours ago</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">iPhone 12 Pro</h4>
                      <p className="text-sm text-gray-500 mt-1">iOS • Safari • Boston, USA</p>
                      <p className="text-xs text-gray-400 mt-1">Last active 3 days ago</p>
                    </div>
                    <button className="text-sm text-red-600 hover:text-red-800">
                      Revoke
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'billing':
        return (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Billing & Subscription</h2>
            
            {/* Current Plan */}
            <div className="bg-white border border-gray-200 rounded-md p-4 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Current Plan</h3>
                  <div className="mt-1 flex items-baseline">
                    <span className="text-2xl font-semibold text-gray-900">Pro Plan</span>
                    <span className="ml-2 text-sm text-gray-500">$15/month</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Your plan renews on August 12, 2023
                  </p>
                </div>
                <button className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Change Plan
                </button>
              </div>
              
              <div className="mt-4 border-t border-gray-200 pt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Plan Features</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li className="flex items-center">
                    <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Unlimited timelines
                  </li>
                  <li className="flex items-center">
                    <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Team collaboration (up to 10 members)
                  </li>
                  <li className="flex items-center">
                    <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Advanced analytics
                  </li>
                  <li className="flex items-center">
                    <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Priority support
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Payment Method */}
            <div className="bg-white border border-gray-200 rounded-md p-4 mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Payment Method</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-gray-100 p-2 rounded mr-3">
                    <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Visa ending in 4242</p>
                    <p className="text-sm text-gray-500">Expires 12/2024</p>
                  </div>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  Edit
                </button>
              </div>
            </div>
            
            {/* Billing History */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">Billing History</h3>
              <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Download</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Jul 12, 2023
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Pro Plan Subscription
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        $15.00
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Paid
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-blue-600 hover:text-blue-900">
                          Download
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Jun 12, 2023
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Pro Plan Subscription
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        $15.00
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Paid
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-blue-600 hover:text-blue-900">
                          Download
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="flex items-center justify-center h-64 bg-gray-50 rounded-md border border-gray-200">
            <div className="text-center">
              <HelpCircle size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Section Under Construction</h3>
              <p className="text-gray-500">This settings section is coming soon.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-4">
        {/* Sidebar */}
        <div className="md:col-span-1 bg-gray-50 p-6 border-r border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Settings</h2>
          <nav className="space-y-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md w-full ${
                  activeSection === item.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <span className={`mr-3 ${activeSection === item.id ? 'text-blue-500' : 'text-gray-400'}`}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        
        {/* Main Content */}
        <div className="md:col-span-3 p-6">
          {renderSectionContent()}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;