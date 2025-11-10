"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.get("/", async (req, res) => {
    try {
        const grouped = await prisma.invoice.groupBy({
            by: ["vendorId"],
            _sum: { amount: true },
        });
        const vendors = await prisma.vendor.findMany({
            select: { id: true, category: true },
        });
        const catSpend = {};
        grouped.forEach((g) => {
            const v = vendors.find((x) => x.id === g.vendorId);
            if (v?.category) {
                catSpend[v.category] =
                    (catSpend[v.category] || 0) + (g._sum.amount || 0);
            }
        });
        const finalData = Object.entries(catSpend).map(([category, totalSpend]) => ({
            category,
            totalSpend,
        }));
        res.json(finalData);
    }
    catch (e) {
        console.error("categorySpend route error:", e);
        res.status(500).json({ error: "Something broke" });
    }
});
exports.default = router;
