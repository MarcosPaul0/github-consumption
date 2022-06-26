import { getCodeFrequency } from "../calls";
import prisma from "../prisma";

async function consumptionCodeFrequency() {
  let repoCount = 0;
  let codeFrequencyCount = 0;

  // busca todos repositórios e seu dono cadastrados no banco de dados ordenados pela data de criação
  const allRepositories = await prisma.repositories.findMany({
    orderBy: {
      created_at: "desc",
    },
    include: {
      owner: true,
    },
  });

  // iteração sobre o resultado da busca
  for (const [index, repo] of allRepositories.entries()) {
    const allCodeFrequency = await getCodeFrequency(
      repo.owner.login,
      repo.name
    );

    console.log(`repo ${repoCount}`);
    repoCount++;

    // se existe uma frequência de código é registrado no banco de dados
    if (allCodeFrequency && allCodeFrequency?.length > 0) {
      for (const [index, codeFrequency] of allCodeFrequency.entries()) {
        await prisma.codeFrequency.create({
          data: {
            repo_id: repo.id,
            date: new Date(codeFrequency[0]),
            additions: codeFrequency[1],
            deletions: codeFrequency[2],
          },
        });

        console.log(`Frequência de código ${codeFrequencyCount} criado`);
        codeFrequencyCount++;
      }
    }
  }
}

consumptionCodeFrequency();
