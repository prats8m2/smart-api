import { createConnection } from "typeorm";
import { DB_CONFIG } from "../../config/config";
import Logger from "../utility/logger";

class Database {
  public connect = () => {
    // Initialize a connection pool against the database.
    createConnection({
      type: "postgres",
      host: DB_CONFIG.host,
      port: parseInt(DB_CONFIG.port, 10),
      database: DB_CONFIG.database,
      username: DB_CONFIG.username,
      password: DB_CONFIG.password,
      entities: [
      ],
      subscribers: [
      ],
      logging: DB_CONFIG.logging === "true",
      synchronize: DB_CONFIG.sync === "true",
    })
      .then(async (connection: any) => {
        //Check if data is empty create super admin
        
        Logger.http(`${DB_CONFIG.database} Database Connected!`);
        console.log(`DB URL: ${DB_CONFIG.host}`);
      })
      .catch((error) => console.log(error));
  };
}
