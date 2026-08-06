const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// Server port
const HTTP_PORT = 3333;

// Logging
app.use(morgan("tiny"));

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable CORS for all routes
// Enable CORS for all routes and allow the X-Authorization header used by the frontend
app.use(
  cors({
    origin: true,
    allowedHeaders: ["Content-Type", "X-Authorization"],
  })
);

// Root endpoint
app.get("/", (req, res, next) => {
  res.json({ status: "Alive" });
});

// Other API endpoints: Links go here...
require("./app/routes/articles.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/comments.routes")(app);
// Default response for any other request
app.use(function (req, res) {
  res.sendStatus(404);
});

// Start server (after middleware and routes are registered)
app.listen(HTTP_PORT, () => {
  console.log("Server running on port: " + HTTP_PORT);
});
