export const Camera = () => null;

export const useCameraPermission = jest.fn().mockReturnValue({
  status: 'authorized',
  requestPermission: jest.fn().mockResolvedValue('authorized'),
});

export const useCameraDevice = jest.fn().mockReturnValue(null);

export const useCodeScanner = jest.fn().mockReturnValue([null, jest.fn()]);

export const Code = jest.fn();
