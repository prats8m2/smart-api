// Library imports
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// import swaggerUi from "swagger-ui-express";

// File imports
import userRoutes from "./routes/user.routes";

import Database from "./db";
//import swaggerDocument from "../swagger/swagger.json";

class Server {
  private app;

  constructor() {
    this.app = express();
    this.config();
    this.routerConfig();
    this.databaseConfig();
    //  this.swaggerConfig();
  }

  // Configuration
  private config() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json({ limit: "1mb" })); // 100kb default
    this.app.use(
      cors({
        // disable CORS
        origin: "*",
      })
    );
  }

  // Routes
  private routerConfig() {
    this.app.use("/api/v1/user", userRoutes);
  }

  //database
  private databaseConfig() {
    const db = new Database();
    db.connect();
  }

  // Swagger
  // private swaggerConfig() {
  //   const options = {
  //     customCssUrl: "../swagger/swagger.css",
  //     authAction: {
  //       JWT: {
  //         name: "JWT",
  //         schema: {
  //           type: "apiKey",
  //           in: "header",
  //           name: "Authorization",
  //           description: "",
  //         },
  //         value: "Bearer <JWT>",
  //       },
  //     },
  //   };
  //   this.app.use(
  //     "/swagger/api/docs",
  //     swaggerUi.serve,
  //     swaggerUi.setup(swaggerDocument, options)
  //   );
  // }

  // Server
  public start = (port: number) => {
    return new Promise((resolve, reject) => {
      this.app
        .listen(port, () => {
          resolve(port);
        })
        .on("error", (err: object) => reject(err));
    });
  };
}

export default Server;
