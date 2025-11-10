import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// GET /stats — overview metrics
router.get("/", async (req, res) => {
  try {
    const totalInvoices = await prisma.invoice.count();
    const totalSpend = await prisma.invoice.aggregate({
      _sum: { amount: true },
    });

    const avgInvoiceValue = await prisma.invoice.aggregate({
      _avg: { amount: true },
    });

    const totalDocuments = await prisma.document.count();

    res.json({
      totalSpend: totalSpend._sum.amount || 0,
      totalInvoices,
      avgInvoiceValue: avgInvoiceValue._avg.amount || 0,
      totalDocuments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

export default router;
