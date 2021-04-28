interface GetDevice {
  (width: number): 'phone' | 'tablet' | 'desktop';
}

export const getDevice: GetDevice = (width: Number): 'tablet' | 'desktop' | 'phone' => {
  const isPhone = typeof navigator !== 'undefined' && navigator && navigator.userAgent.match(/phone/gi);

  if (width < 680 || isPhone) {
    return 'phone';
  }

  if (width < 1280 && width > 680) {
    return 'tablet';
  }

  return 'desktop';
};

export default {
  getDevice,
};
