const { Pool } = require("pg");

const dbConfig = {
  host: "192.168.1.4",
  port: 5432,
  database: "cmrcet",
  user: "postgres",
  password: "cmrcet@123"
};

const pool = new Pool(dbConfig);

const query = (text, params) => pool.query(text, params);

module.exports = {
  query
};
