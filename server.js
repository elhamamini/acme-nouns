const express = require("express");
const PORT = 3000;
const app = express();
const db = require("./db.js");
const path = require("path");
app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/api/people", async (req, res, next) => {
  try {
    const people = await db.People.findAll();
    res.send(people);
  } catch (e) {
    next(e);
  }
});
app.get("/api/places", async (req, res, next) => {
  try {
    const places = await db.Place.findAll();
    res.send(places);
  } catch (e) {
    next(e);
  }
});
app.get("/api/things", async (req, res, next) => {
  try {
    const thing = await db.Thing.findAll();
    res.send(thing);
  } catch (e) {
    next(e);
  }
});
db.syncAndSeed().then(() => {
  app.listen(PORT, () => {
    console.log("sucsess");
  });
});
