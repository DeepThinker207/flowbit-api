import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import statsRouter from "./routes/stats"; 
import invoiceTrendsRouter from "./routes/invoiceTrends";

const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

// Default route
app.get("/", (req, res) => {
  res.json({ message: "Flowbit API is running!" });
});

// User routes
app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.post("/users", async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = await prisma.user.create({
      data: { name, email },
    });
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// Stats route (new for Phase 2)
app.use("/stats", statsRouter);
app.use("/invoice-trends", invoiceTrendsRouter);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
