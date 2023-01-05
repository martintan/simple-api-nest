import 'dotenv/config';
// import * as dotenv from 'dotenv';

// Load the correct environment variables file
// dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const PORT = process.env.PORT;
export const MONGODB_URL = process.env.MONGODB_URL;
export const OPEN_WEATHER_MAP_API_KEY = process.env.OPEN_WEATHER_MAP_API_KEY;
export const OPEN_WEATHER_MAP_API_BASE_URL =
  process.env.OPEN_WEATHER_MAP_API_BASE_URL;
export const INTERNAL_SERVER_ERROR_MESSAGE =
  'Something went wrong, please try again.';
