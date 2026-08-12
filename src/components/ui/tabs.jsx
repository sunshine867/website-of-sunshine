import * as React from 'react';
import { cn } from '@/lib/utils';

const Tabs = ({ defaultValue, value, onValueChange, children, className }) => {
  const [activeTab, setActiveTab] = React.useState(value || defaultValue);
  
  const handleTabChange = (newValue) => {
    setActiveTab(newValue);
    onValueChange?.(newValue);
  };

  return (
    <div className={className}>
      {React.Children.map(children, child => 
        React.cloneElement(child, { activeTab, onTabChange: handleTabChange })
      )}
    </div>
  );
};

const TabsList = ({ children, className, activeTab, onTabChange }) => (
  <div className={cn('inline-flex h-11 items-center justify-center rounded-xl bg-gray-100 p-1', className)}>
    {React.Children.map(children, child =>
      React.cloneElement(child, { activeTab, onTabChange })
    )}
  </div>
);

const TabsTrigger = ({ value, children, className, activeTab, onTabChange }) => (
  <button
    onClick={() => onTabChange?.(value)}
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all',
      activeTab === value ? 'bg-white text-primary-700 shadow-sm' : 'text-gray-500 hover:text-gray-700',
      className
    )}
  >
    {children}
  </button>
);

const TabsContent = ({ value, children, className, activeTab }) => {
  if (activeTab !== value) return null;
  return <div className={cn('mt-2', className)}>{children}</div>;
};

export { Tabs, TabsList, TabsTrigger, TabsContent };