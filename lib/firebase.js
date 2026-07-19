import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

export const isFirebaseConfigured = Boolean(firebaseConfig.databaseURL);

let dbInstance = null;

/**
 * Lazily initialize the Realtime Database.
 * Returns null when config is missing (e.g. env vars not set at build time)
 * so callers can degrade gracefully instead of crashing the build.
 */
export function getDb() {
  if (!isFirebaseConfigured) return null;
  if (dbInstance) return dbInstance;

  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  dbInstance = getDatabase(app);
  return dbInstance;
}
