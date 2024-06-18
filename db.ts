import mysql from "mysql2/promise";

async function connectDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || "3306"), // Default MySQL port is 3306
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    console.log("Database connected!");
    return connection;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error; // Re-throw the error to handle it in the server.ts
  }
}

export default connectDatabase();
