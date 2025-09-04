import express from "express";
import app from "./app.js";
import dotenv from "dotenv";
import syncDatabase from "./ConnectDB.js";

app.use(express.json());
dotenv.config({quiet: true});

app.get("/", (req, res) => {
  res.send("sequelize + postgreSQl is working...!");
});

const url = `http://localhost:${process.env.PORT}`;

syncDatabase()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on ${url}`);
    });
  })
  .catch(() => {
    console.error("Server failed to sync error", error);
  });
