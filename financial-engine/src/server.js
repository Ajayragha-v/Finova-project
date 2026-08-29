const express = require("express");
const cors = require("cors");
const analyzeBusiness = require("./financialEngine");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Financial Engine API is running"
  });
});

app.post("/analyze", (req, res) => {
  try {
    const result = analyzeBusiness(req.body);

    res.json(result);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Financial Engine running on port ${PORT}`);
});