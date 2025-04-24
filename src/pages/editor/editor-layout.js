import React, { useState } from 'react';
import { ChevronRight, Menu, X, Search, Bell, FileText, PlusCircle, BarChart2, User } from 'lucide-react';
import { Outlet } from 'react-router-dom';

const EditorLayout = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`bg-gray-900 text-white transition-all duration-300 flex flex-col ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}>
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          {!isSidebarCollapsed && (
          <img 
              src="/images/logo.png" 
              alt="TIME-PAL Logo" 
              className="h-10" 
            />
          )}
          {isSidebarCollapsed && (
            <img 
              src="/images/logo.png" 
              alt="TIME-PAL Icon" 
              className="h-8" 
            />
          )}
          <button 
            onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
            className="text-gray-400 hover:text-white"
          >
            {isSidebarCollapsed ? <ChevronRight size={18} /> : <X size={18} />}
          </button>
        </div>
        
        {/* Nav Section Title */}
        <div className="px-4 py-3 text-xs uppercase text-gray-400 font-semibold">
          {!isSidebarCollapsed && "Editor Panel"}
        </div>

        {/* Nav Links */}
        <SidebarNavigation collapsed={isSidebarCollapsed} />

        {/* User Profile */}
        <div className="border-t border-gray-800 p-4 mt-auto">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-medium">
                E
              </div>
            </div>
            {!isSidebarCollapsed && (
              <div className="ml-3">
                <p className="text-sm font-medium">Editor</p>
                <p className="text-xs text-gray-400 truncate">editor@timepal.com</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <button className="md:hidden mr-4" onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}>
              <Menu size={20} />
            </button>
            <div className="flex items-center text-sm">
              <span className="text-gray-500">Editor</span>
              <ChevronRight size={16} className="mx-1 text-gray-400" />
              <span className="font-medium">Dashboard</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search news..."
                className="py-2 pl-10 pr-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            <button className="p-2 rounded-md text-gray-500 hover:bg-gray-100 relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-green-400 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
            <Outlet />
        </main>
      </div>
    </div>
  );
};

// SidebarNavigation Component
const SidebarNavigation = ({ collapsed }) => {
  const navItems = [
    { icon: FileText, label: "My News", isActive: true, href: "/editor/my-news" },
    { icon: PlusCircle, label: "Add News", isActive: false, href: "/editor/add-news" },
    { icon: BarChart2, label: "Analytics", isActive: false, href: "/editor/analytics" },
    { icon: User, label: "Profile", isActive: false, href: "/editor/profile" }
  ];

  return (
    <nav className="flex-1">
      {navItems.map((item, index) => (
        <NavItem 
          key={index}
          icon={<item.icon size={20} />} 
          label={item.label} 
          isActive={item.isActive} 
          collapsed={collapsed} 
          href={item.href}
        />
      ))}
    </nav>
  );
};

// NavItem Component
const NavItem = ({ icon, label, isActive = false, collapsed, href }) => {
  return (
    <a 
      href={href} 
      className={`flex items-center py-3 px-4 ${isActive ? 'bg-green-700 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
    >
      <span className="text-lg">{icon}</span>
      {!collapsed && <span className="ml-4">{label}</span>}
    </a>
  );
};

export default EditorLayout;