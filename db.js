const Sequalize = require("sequelize");

const db = new Sequalize("postgres://localhost:5432/acme_nouns", {
  logging: false
});
const People = db.define("people", {
  name: {
    type: Sequalize.STRING,
    allowNull: false,
    allowEmpty: false,
    unique: true
  }
});
const Place = db.define("place", {
  name: {
    type: Sequalize.STRING,
    allowNull: false,
    allowEmpty: false,
    unique: true
  }
});
const Thing = db.define("thing", {
  name: {
    type: Sequalize.STRING,
    allowNull: false,
    allowEmpty: false,
    unique: true
  }
});
People.belongsTo(Place);
Place.hasMany(People);

Thing.belongsTo(People);
People.hasMany(Thing);
const syncAndSeed = async () => {
  await db.sync({ force: true });
  const [newyork, london] = await Promise.all([
    Place.create({ name: "newyork" }),
    Place.create({ name: "london" })
  ]);

  const [larry, moe, joe] = await Promise.all([
    People.create({ name: "larry", placeId: newyork.id }),
    People.create({ name: "moe", placeId: newyork.id }),
    People.create({ name: "joe", placeId: london.id })
  ]);
  const [laptop, car, key] = await Promise.all([
    Thing.create({ name: "laptop", peopleId: larry.id }),
    Thing.create({ name: "car", peopleId: moe.id }),
    Thing.create({ name: "key", peopleId: joe.id })
  ]);
};
module.exports = {
  syncAndSeed,
  People,
  Place,
  Thing
};
