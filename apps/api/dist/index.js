"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const stats_1 = __importDefault(require("./routes/stats"));
const invoiceTrends_1 = __importDefault(require("./routes/invoiceTrends"));
const vendors_1 = __importDefault(require("./routes/vendors"));
const categorySpend_1 = __importDefault(require("./routes/categorySpend"));
const topVendors_1 = __importDefault(require("./routes/topVendors"));
const cashOutflow_1 = __importDefault(require("./routes/cashOutflow"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Routers
app.use("/vendors", vendors_1.default);
app.use("/category-spend", categorySpend_1.default);
app.use("/vendors/top10", topVendors_1.default);
app.use("/cash-outflow", cashOutflow_1.default);
app.use("/stats", stats_1.default);
app.use("/invoice-trends", invoiceTrends_1.default);
app.get("/", (req, res) => {
    res.json({ message: "Flowbit API is running!" });
});
app.get("/users", async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    }
    catch (error) {
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
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Failed to create user" });
    }
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
