"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch stats" });
    }
});
exports.default = router;
