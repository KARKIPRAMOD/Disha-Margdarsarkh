const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(express.static("public")); // Serve static files from the 'public' directory

// Route for root
app.get("/", (req, res) => {
  res.send("Location Server is running!");
});

// Route to save location data
app.post("/location", (req, res) => {
  const locationData = req.body;

  // Ensure that both latitude and longitude are provided
  if (locationData.latitude && locationData.longitude) {
    fs.writeFile(
      path.join(__dirname, "location_data.json"),
      JSON.stringify(locationData, null, 2),
      (err) => {
        if (err) {
          return res
            .status(500)
            .json({ status: "error", message: "Failed to save location data" });
        }
        res.json({
          status: "success",
          latitude: locationData.latitude,
          longitude: locationData.longitude,
        });
      }
    );
  } else {
    res.status(400).json({
      status: "error",
      message: "Latitude and longitude are required",
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
