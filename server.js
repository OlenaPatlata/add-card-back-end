const app = require("./app");

require('dotenv').config();
const mongoose = require('mongoose');
const { PORT = 3000 } = process.env;
const { CONNECT } = process.env;




mongoose.connect(CONNECT).then(() => {
  console.log("Database connection successful");
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`)
  });
}).catch((err) => {
  console.log(err.message);
  process.exit(1)
});


