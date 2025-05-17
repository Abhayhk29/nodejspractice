const express = require("express");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "*", credentials: true }));

const PORT = process.env.PORT || 9001;

app.use(express.json());

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});