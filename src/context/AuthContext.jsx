import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const initialNotifications = [
  {
    id: 1,
    title: 'Critical Blackspot Risk Alert',
    message: 'High accident probability predicted on NH-44 KM 142-148 (Ambala Section) due to fog and heavy freight merge.',
    type: 'critical',
    time: '12 mins ago',
    unread: true,
  },
  {
    id: 2,
    title: 'Intervention Execution Update',
    message: 'Speed governor audit and rumble strip installation completed at Pune-Mumbai Expressway KM 38.',
    type: 'success',
    time: '1 hour ago',
    unread: true,
  },
  {
    id: 3,
    title: 'Monthly Safety Report Generated',
    message: 'August 2026 National Highway Safety Audit Report is ready for review and download.',
    type: 'info',
    time: '3 hours ago',
    unread: true,
  },
  {
    id: 4,
    title: 'Vulnerability Threshold Exceeded',
    message: 'Two-wheeler fatality risk index rose by 14% in Bengaluru Urban District during peak evening hours.',
    type: 'warning',
    time: '5 hours ago',
    unread: false,
  },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'Dr. Rajesh Sharma',
    email: 'rajesh.sharma@morth.gov.in',
    role: 'National Safety Chief',
    department: 'Ministry of Road Transport & Highways',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
    region: 'All States / Pan-India',
  });

  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('Pan-India');

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const login = (userData) => {
    setUser(userData || {
      name: 'Dr. Rajesh Sharma',
      email: 'rajesh.sharma@morth.gov.in',
      role: 'National Safety Chief',
      department: 'Ministry of Road Transport & Highways',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
      region: 'All States / Pan-India',
    });
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const markNotificationAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        theme,
        toggleTheme,
        login,
        logout,
        sidebarCollapsed,
        setSidebarCollapsed,
        mobileSidebarOpen,
        setMobileSidebarOpen,
        notifications,
        notificationDrawerOpen,
        setNotificationDrawerOpen,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        unreadCount,
        selectedRegion,
        setSelectedRegion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
