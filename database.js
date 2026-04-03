import mysql from "mysql2/promise";

const dbConfig = {
  database: "traveljabs",
  host: "localhost",
  user: "root",
  password: "",
  port: 3306,
};

const database = await mysql.createConnection(dbConfig);

export default database;