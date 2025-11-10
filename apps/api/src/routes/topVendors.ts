// src/routes/topVendors.ts
import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// get top 10 vendors by spend
router.get("/", async (req, res) => {
  try {
    // get sum of invoice amount by vendorId
    const data = await prisma.invoice.groupBy({
      by: ["vendorId"],
      _sum: { amount: true },
      orderBy: { _sum: { amount: "desc" } },
      take: 10,
    });

    // get vendors
    const vendors = await prisma.vendor.findMany({
      select: { id: true, name: true },
    });

    // manually join because prisma doesn't do join in groupBy (yea, kinda sucks)
    const result = data.map((v) => {
      const vendor = vendors.find((x) => x.id === v.vendorId);
      return {
        vendor: vendor ? vendor.name : "Unknown Vendor",
        totalSpend: v._sum.amount || 0,
      };
    });

    res.json(result);
  } catch (err) {
    console.log("top vendors err:", err);
    res.status(500).json({ msg: "something went wrong :(" });
  }
});

export default router;
