import express from "express";
import request from "request";
import fetch from "node-fetch";
import dotenv from "dotenv";
import url from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const KEY = process.env.TOKEN;

app.set("view engine", "ejs");

app.get("/foods", (req, res) => {
  let optionsB = {
    method: "POST",
    url: "https://platform.fatsecret.com/rest/server.api",
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${KEY}`,
    },
    form: {
      method: "foods.search",
      search_expression: "toast",
      format: "json",
    },
    json: true,
  };

  request(optionsB, (error, response, body) => {
    if (error) throw new Error(error);
    const { foods } = body;
    res.render("index", {
      title: "Foods",
      foods: foods.food,
    });
  });
});

app.get("/detail/:id", (req, res) => {
  let optionsB = {
    method: "POST",
    url: "https://platform.fatsecret.com/rest/server.api",
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${KEY}`,
    },
    form: {
      method: "food.get.v2",
      food_id: req.params.id,
      format: "json",
    },
    json: true,
  };
  request(optionsB, (error, response, body) => {
    if (error) throw new Error(error);
    res.send(body);
  });
});

app.get("/token", (req, res) => {
  let options = {
    method: "POST",
    url: "https://oauth.fatsecret.com/connect/token",
    method: "POST",
    auth: {
      user: CLIENT_ID,
      password: CLIENT_SECRET,
    },
    headers: { "content-type": "application/x-www-form-urlencoded" },
    form: {
      grant_type: "client_credentials",
      scope: "basic",
    },
    json: true,
  };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  });

  res.sendStatus(200);
});

app.get("/food", async (req, res) => {
  let optionsB = {
    method: "POST",
    url: "https://platform.fatsecret.com/rest/server.api",
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${KEY}`,
    },
    form: {
      method: "foods.search",
      search_expression: "toast",
      format: "json",
    },
    json: true,
  };

  request(optionsB, (error, response, body) => {
    if (error) throw new Error(error);

    console.log(body);
  });

  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`"Listening on Localhost:${PORT}`);
});
