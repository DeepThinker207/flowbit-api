import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

async function main() {
  const data = JSON.parse(fs.readFileSync("./data/Analytics_Test_Data.json", "utf-8"));

  console.log("Starting document import...");

  for (const doc of data) {
    await prisma.document.upsert({
  where: { id: doc._id },
  update: {}, // Nothing to update (or you can define updates)
  create: {
    id: doc._id,
    name: doc.name,
    filePath: doc.filePath,
    fileSize: BigInt(doc.fileSize?.$numberLong || 0),
    fileType: doc.fileType,
    status: doc.status,
    organizationId: doc.organizationId,
    departmentId: doc.departmentId,
    createdAt: doc.createdAt?.$date ? new Date(doc.createdAt.$date) : null,
    updatedAt: doc.updatedAt?.$date ? new Date(doc.updatedAt.$date) : null,
    isValidatedByHuman: doc.isValidatedByHuman || false,
    uploadedById: doc.uploadedById || null,
    processedAt: doc.processedAt?.$date ? new Date(doc.processedAt.$date) : null,
    analyticsId: doc.analyticsId || null,
    metadata: doc.metadata || {},
    extractedData: doc.extractedData || {},
    validatedData: doc.validatedData || {},
  },
});

  }

  console.log("Document import complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
