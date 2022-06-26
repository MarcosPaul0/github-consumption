import { getAllLicenses } from "../calls";
import prisma from "../prisma";

async function consumptionLicenses() {
  try {
    const allLicenses = await getAllLicenses();

    allLicenses.forEach(async (license) => {
      await prisma.licenses.create({
        data: {
          key: license.key,
          name: license.name,
          url: license.url,
        },
      });
    });
  } catch (error: any) {
    console.log(error);
  }
}

consumptionLicenses();
