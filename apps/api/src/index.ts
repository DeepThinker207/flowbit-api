import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import statsRouter from "./routes/stats"; 
import invoiceTrendsRouter from "./routes/invoiceTrends";
import vendorsRouter from "./routes/vendors";
import categorySpendRouter from "./routes/categorySpend";
import topVendorsRouter from "./routes/topVendors";
import cashOutflowRouter from "./routes/cashOutflow";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/vendors", vendorsRouter);
app.use("/category-spend", categorySpendRouter);
app.use("/vendors/top10", topVendorsRouter);
app.use("/cash-outflow", cashOutflowRouter);

const prisma = new PrismaClient();

app.get("/", (req, res) => {
  res.json({ message: "Flowbit API is running!" });
});

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
app.use("/stats", statsRouter);
app.use("/invoice-trends", invoiceTrendsRouter);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));