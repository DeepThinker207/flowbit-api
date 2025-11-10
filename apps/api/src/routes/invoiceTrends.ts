import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

/**
 * @route   GET /invoice-trends
 * @desc    Returns monthly invoice trends (count + spend)
 */
router.get("/", async (req, res) => {
  try {
    const trends = await prisma.$queryRawUnsafe(`
      SELECT 
        TO_CHAR(date_trunc('month', "date"), 'YYYY-MM') AS month,
        COUNT(*) AS "invoiceCount",
        COALESCE(SUM("amount"), 0) AS "totalSpend"
      FROM "Invoice"
      GROUP BY month
      ORDER BY month ASC;
    `);

    // Optional formatting (numbers to integers)
    const formatted = (trends as any[]).map((t) => ({
      month: t.month,
      invoiceCount: Number(t.invoiceCount),
      totalSpend: Number(t.totalSpend),
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Error fetching invoice trends:", err);
    res.status(500).json({ error: "Failed to fetch invoice trends" });
  }
});

export default router;
