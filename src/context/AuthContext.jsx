import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const initialNotifications = [
  {
    id: 1,
    title: 'Critical Blackspot Risk Alert',
    message: 'High accident probability predicted on NH Junction 04 (Chennai Section) due to fog and freight merge.',
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
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'Dr. Rajesh Sharma',
    email: 'rajesh.sharma@roadsafe.gov.in',
    role: 'Senior Road Safety Analyst',
    department: 'Road Safety Intelligence Division',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
    region: 'Pan-India',
  });

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Timezone & Time-Based UI Engine (Prompt 3)
  const [systemTimezone, setSystemTimezone] = useState('');
  const [currentTimeStr, setCurrentTimeStr] = useState('');
  const [timeMode, setTimeMode] = useState('afternoon'); // morning | afternoon | evening | night
  const [manualTimeModeOverride, setManualTimeModeOverride] = useState(null);

  // Accessibility Controls (Prompt 4)
  const [fontSizeScale, setFontSizeScale] = useState('normal'); // normal | large | xlarge
  const [reducedMotion, setReducedMotion] = useState(false);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('Pan-India');

  // Detect system timezone and calculate current local hour mode
  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Local System Time';
      setSystemTimezone(tz);
    } catch {
      setSystemTimezone('Local System Time');
    }

    const updateSystemClockAndMode = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      setCurrentTimeStr(formattedTime);

      // Determine Time Mode
      let calculatedMode = 'afternoon';
      if (hours >= 5 && hours < 12) {
        calculatedMode = 'morning';
      } else if (hours >= 12 && hours < 17) {
        calculatedMode = 'afternoon';
      } else if (hours >= 17 && hours < 21) {
        calculatedMode = 'evening';
      } else {
        calculatedMode = 'night';
      }

      const activeMode = manualTimeModeOverride || calculatedMode;
      setTimeMode(activeMode);
      document.documentElement.setAttribute('data-time-mode', activeMode);
    };

    updateSystemClockAndMode();
    const interval = setInterval(updateSystemClockAndMode, 30000);
    return () => clearInterval(interval);
  }, [manualTimeModeOverride]);

  // Apply Accessibility Classes to Document Root
  useEffect(() => {
    document.documentElement.classList.remove('font-scale-normal', 'font-scale-large', 'font-scale-xlarge');
    document.documentElement.classList.add(`font-scale-${fontSizeScale}`);

    if (reducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
  }, [fontSizeScale, reducedMotion]);

  const toggleManualTimeMode = () => {
    const modes = ['morning', 'afternoon', 'evening', 'night'];
    const currentIndex = modes.indexOf(timeMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setManualTimeModeOverride(nextMode);
  };

  const login = (userData) => {
    setUser(userData || {
      name: 'Dr. Rajesh Sharma',
      email: 'rajesh.sharma@roadsafe.gov.in',
      role: 'Senior Road Safety Analyst',
      department: 'Road Safety Intelligence Division',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
      region: 'Pan-India',
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
        systemTimezone,
        currentTimeStr,
        timeMode,
        toggleManualTimeMode,
        setManualTimeModeOverride,
        fontSizeScale,
        setFontSizeScale,
        reducedMotion,
        setReducedMotion,
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
