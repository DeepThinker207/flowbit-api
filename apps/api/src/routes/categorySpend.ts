import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const grouped = await prisma.invoice.groupBy({
      by: ["vendorId"],
      _sum: { amount: true },
    });

    const vendors = await prisma.vendor.findMany({
      select: { id: true, category: true },
    });

    const catSpend: any = {};

    grouped.forEach((g) => {
      const v = vendors.find((x) => x.id === g.vendorId);
      if (v) {
        catSpend[v.category] = (catSpend[v.category] || 0) + (g._sum.amount || 0);
      }
    });

    const finalData = Object.entries(catSpend).map(([category, totalSpend]) => ({
      category,
      totalSpend,
    }));

    res.json(finalData);
  } catch (e) {
    console.error("categorySpend route error:", e);
    res.status(500).json({ error: "Something broke" });
  }
});

export default router;
