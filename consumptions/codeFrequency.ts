import { getCodeFrequency } from "../consumption";
import prisma from "../prisma";

async function consumptionCodeFrequency() {
  let repoCount = 0;
  let codeFrequencyCount = 0;

  const allRepositories = await prisma.repositories.findMany({
    orderBy: {
      created_at: "desc",
    },
    include: {
      owner: true,
    },
  });

  for (const [index, repo] of allRepositories.slice(912 + 1464).entries()) {
    const allCodeFrequency = await getCodeFrequency(
      repo.owner.login,
      repo.name
    );

    console.log(`repo ${repoCount}`);
    repoCount++;

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

        console.log(`code frequency ${codeFrequencyCount}`);
        codeFrequencyCount++;
      }
    }
  }
}

consumptionCodeFrequency();
