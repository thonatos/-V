import React, { useState } from 'react';
import { getDevice } from '@/util';
import DeviceContext from '@/context/device';

interface Props {
  children?: any;
}

const Provider: React.FC<Props> = ({ children }) => {
  const [device, setDevice] = useState(getDevice(NaN));

  if (typeof window !== 'undefined') {
    window.addEventListener('optimizedResize', (e) => {
      const deviceWidth = (e && e.target && (e.target as Window).innerWidth) || NaN;
      setDevice(getDevice(deviceWidth));
    });
  }

  return (
    <DeviceContext.Provider value={device}>
      {children}
    </DeviceContext.Provider>
  );
};

export default Provider;
