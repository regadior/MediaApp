import express from "express";
import path from "path";
import "reflect-metadata";
import { AppDataSource, initializeAppDataSource } from "./db/database"; // importa la conexión desde el archivo database.ts
import { UserController } from "./user/api_rest/controller/UserController";
// Create Express server
const app = express();
// Express configuration
app.set("port", process.env.PORT ?? 8000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 }));
// Verify db connection
initializeAppDataSource();
//All Controllers
UserController(app);

export default app;
