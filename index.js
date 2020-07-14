const express = require("express");
const path = require("path");
const { graphqlHTTP } = require("express-graphql");

const schema = require("./graphql/schema");
const resolver = require("./graphql/resolver");
const sequelize = require("./utils/database");
const { Resolver } = require("dns");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use(
  graphqlHTTP({
    schema,
    rootValue: resolver,
  })
);

app.use((req, res, next) => {
  res.sendFile("/index.html");
});

async function start() {
  try {
    await sequelize.sync();
    app.listen(PORT);
  } catch (error) {
    console.log(error);
  }
}

start();
