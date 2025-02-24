const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/users", require("./routes/user.routes"));
app.use("/api/plants", require("./routes/plant.routes"));
app.use("/api/favorites", require("./routes/favorite.routes"));
app.use("/api/notes", require("./routes/note.routes"));

module.exports = app;
