import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Cash outflow per month
router.get("/", async (req, res) => {
  try {
    const invoices = await prisma.invoice.findMany({
      select: { date: true, amount: true },
    });

    const monthly: { [key: string]: number } = {};
    invoices.forEach((inv) => {
      if (!inv.date) return;
      const month = new Date(inv.date).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      monthly[month] = (monthly[month] || 0) + inv.amount;
    });

    const result = Object.entries(monthly).map(([month, total]) => ({
      month,
      totalSpend: total,
    }));

    result.sort((a, b) => {
      const da = new Date(a.month);
      const db = new Date(b.month);
      return da.getTime() - db.getTime();
    });

    res.json(result);
  } catch (err) {
    console.error("💥 Error generating cash outflow:", err);
    res.status(500).json({ error: "Failed to get cash outflow data" });
  }
});

export default router;
