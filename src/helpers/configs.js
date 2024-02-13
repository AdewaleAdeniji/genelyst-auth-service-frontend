const env = import.meta.env;

const configs = {
  API_BASE_URL: env.VITE_APP_API_BASE_URL,
  USER_SERVICE_URL: env.VITE_APP_USER_SERVICE_URL,
  USER_SERVICE_ID: env.VITE_APP_USER_SERVICE_ID,
  USER_SERVICE_PUBLIC_KEY: env.VITE_APP_AUTH_PUBLIC_KEY,
};
export default configs;
