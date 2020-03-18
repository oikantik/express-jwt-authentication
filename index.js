const express = require("express");
const cors = require("cors");

const app = express();

const dbConnection = require("./config/db");
const PORT = process.env.PORT || 9000;

dbConnection();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200 // because older browsers choke on 204
  })
);
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use("/dashboard", require("./routes/dashboard"));

app.listen(PORT, () => console.log("Listening to port", PORT));
