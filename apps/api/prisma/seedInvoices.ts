import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
  console.log("Seeding basic vendor and invoice data...");
  // Vendors
  await prisma.vendor.createMany({
    data: [
      { vendorId: "V001", name: "Techify Solutions", category: "Software" },
      { vendorId: "V002", name: "FreshBites Caterers", category: "Food" },
      { vendorId: "V003", name: "GreenLogistics", category: "Transport" },
    ],
  });
  // Customer
  const customer = await prisma.customer.create({
    data: { customerId: "C001", name: "Flowbit Pvt. Ltd." },
  });

  // Invoice 1
  await prisma.invoice.create({
    data: {
      invoiceId: "INV-001",
      amount: 4000,
      date: new Date("2025-10-01"),
      vendor: { connect: { vendorId: "V001" } },
      customer: { connect: { customerId: "C001" } },
      payment: {
        create: {
          paymentId: "PAY-001",
          date: new Date("2025-10-03"),
          amount: 4000,
          status: "Paid",
        },
      },
    },
  });
  // Invoice 2
  await prisma.invoice.create({
    data: {
      invoiceId: "INV-002",
      amount: 2500,
      date: new Date("2025-09-22"),
      vendor: { connect: { vendorId: "V002" } },
      customer: { connect: { customerId: "C001" } },
      payment: {
        create: {
          paymentId: "PAY-002",
          date: new Date("2025-09-25"),
          amount: 2500,
          status: "Pending",
        },
      },
    },
  });
  console.log("Data seeded successfully!");
}
main()
  .catch(console.error)
  .finally(async () => await prisma.$disconnect());
