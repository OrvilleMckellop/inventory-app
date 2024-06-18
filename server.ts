import express from "express";
import cors from "cors";
import { config } from "./config/config";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the inventory app!");
});

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
