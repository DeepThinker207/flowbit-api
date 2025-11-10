import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/top10", async (req, res) => {
  try {
    const vendors = await prisma.vendor.findMany({
      include: {
        invoices: {
          select: { amount: true },
        },
      },
    });

    const vendorSpend = vendors.map(v => ({
      name: v.name,
      category: v.category,
      totalSpend: v.invoices.reduce((sum, inv) => sum + inv.amount, 0),
    }));

    const topVendors = vendorSpend
      .sort((a, b) => b.totalSpend - a.totalSpend)
      .slice(0, 10);
      
    res.json(topVendors);
  } catch (error) {
    console.error("Error fetching top vendors:", error);
    res.status(500).json({ error: "Failed to fetch top vendors" });
  }
});
export default router;
