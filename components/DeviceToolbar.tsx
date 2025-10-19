
import React from 'react';
import { Device } from '../types';
import { DesktopIcon } from './icons/DesktopIcon';
import { TabletIcon } from './icons/TabletIcon';
import { MobileIcon } from './icons/MobileIcon';

interface DeviceToolbarProps {
  currentDevice: Device;
  onDeviceChange: (device: Device) => void;
}

const devices: { name: Device; icon: React.FC<{className?: string}> }[] = [
  { name: 'desktop', icon: DesktopIcon },
  { name: 'tablet', icon: TabletIcon },
  { name: 'mobile', icon: MobileIcon },
];

const DeviceToolbar: React.FC<DeviceToolbarProps> = ({ currentDevice, onDeviceChange }) => {
  return (
    <div className="flex items-center space-x-1 bg-slate-200 p-1 rounded-lg">
      {devices.map((device) => (
        <button
          key={device.name}
          onClick={() => onDeviceChange(device.name)}
          className={`p-2 rounded-md transition-colors duration-200 ${
            currentDevice === device.name 
              ? 'bg-white text-indigo-600 shadow-sm' 
              : 'text-slate-500 hover:bg-slate-300 hover:text-slate-700'
          }`}
          title={`Preview on ${device.name.charAt(0).toUpperCase() + device.name.slice(1)}`}
        >
          <device.icon className="h-5 w-5" />
        </button>
      ))}
    </div>
  );
};

export default DeviceToolbar;
