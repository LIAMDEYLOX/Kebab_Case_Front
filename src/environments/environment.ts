export const environment = {
  production: false,
  apiUrl: typeof window !== 'undefined' ? `http://${window.location.hostname}:8000` : 'http://localhost:8000'
};
