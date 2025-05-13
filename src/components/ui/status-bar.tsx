import React from "react";

interface StatusBarProps {
  backgroundColor?: string;
  textColor?: string;
}

const StatusBar: React.FC<StatusBarProps> = ({
  backgroundColor = "bg-background",
  textColor = "text-foreground",
}) => {
  // This component is a placeholder for native status bar
  // It will be replaced by the actual status bar on mobile devices
  return (
    <div
      className={`${backgroundColor} ${textColor} h-6 w-full fixed top-0 left-0 z-50 hidden`}
    >
      {/* Status bar content would go here in a real mobile app */}
    </div>
  );
};

export default StatusBar;
