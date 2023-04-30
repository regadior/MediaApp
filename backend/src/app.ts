import express from "express";
import path from "path";

import { loadApiEndpoints } from "./controllers/api";

// Create Express server
const app = express();
//Verify db connection
const sequelize = require('./db/database');
sequelize.sync({ force: false }).then(() => {
    console.log('Database synced successfully');
  }).catch((error: Error) => {
    console.log(`Database sync failed: ${error}`);
  });
// Express configuration
app.set("port", process.env.PORT ?? 8000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 }));

loadApiEndpoints(app);

export default app;
