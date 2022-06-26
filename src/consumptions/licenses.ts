import { getAllLicenses } from "../calls";
import prisma from "../prisma";

async function consumptionLicenses() {
  try {
    const allLicenses = await getAllLicenses();

    // itreação sobre toas as licensas de positórios
    allLicenses.forEach(async (license) => {

      // insere a licensa no banco de dados
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
