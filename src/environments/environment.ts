export const environment = {
  production: false,
  apiUrl: typeof window !== 'undefined' ? `http://${window.location.hostname}:8000` : 'http://192.168.152.114:8000'
};
