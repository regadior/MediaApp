import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
dotenv.config(); // Se cargan las variables desde el archivo .env
const port = process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 3306;
const dbName = process.env.DATABASE_NAME_DEV;
export const AppDataSource = new DataSource({
  type: "mariadb",
  host: "localhost",
  port: port,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS_DEV,
  database: dbName,
})
export const initializeAppDataSource = async () => {
  try {
    await AppDataSource.initialize();
    console.log(`🚀 Connection to the database successful!!(dbName: ${dbName}, dbPort: ${port})`);
  } catch (error) {
    console.error("🐛 Error during Data Source initialization", error);
  }
};