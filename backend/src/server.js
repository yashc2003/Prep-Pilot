const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const { createApp } = require("./app");
const { connectToDatabase } = require("./db/connect");
const { User, Application } = require("./models");

async function main() {
  const port = Number(process.env.PORT || 5000);
  const mongoUri = process.env.MONGODB_URI;
  const jwtSecret = process.env.JWT_SECRET;

  if (!mongoUri) {
    throw new Error("Missing MONGODB_URI in environment (.env).");
  }
  if (!jwtSecret) {
    throw new Error("Missing JWT_SECRET in environment (.env).");
  }

  await connectToDatabase(mongoUri);
  await Promise.all([User.syncIndexes(), Application.syncIndexes()]);

  const app = createApp();
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on http://localhost:${port}`);
  });
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
