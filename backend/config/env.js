import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// backend/config → backend/.env
dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

if (!process.env.DB_USER) {
  throw new Error('Environment variables not loaded');
}
