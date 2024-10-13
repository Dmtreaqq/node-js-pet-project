require('dotenv').config({ path: '.env.local' })
import { app } from "./app";
import { runDb } from "./repositories/db";

const port = process.env.PORT || 3000;

const startApp = async () => {
  await runDb();

  app.listen(port, () => {
    console.info(`Example app listening on port ${port}`)
  })
}

startApp();