import { getCollaborators } from "../calls";
import prisma from "../prisma";

async function consumptionCollaborators() {
  let repoCount = 0;
  let collaboratorsCount = 0;

  const allRepositories = await prisma.repositories.findMany({
    orderBy: {
      created_at: "desc",
    },
    include: {
      owner: true,
    },
  });

  for (const [index, repo] of allRepositories.entries()) {
    try {
      const allCollaborators = await getCollaborators(
        repo.owner.login,
        repo.name
      );

      console.log(`Repositório ${repoCount}`);
      repoCount++;

      if (allCollaborators && allCollaborators?.length > 0) {
        for (const [index, collaborator] of allCollaborators
          .slice(8676 + 100)
          .entries()) {
          const userFound = await prisma.users.findFirst({
            where: {
              login: collaborator.login,
            },
          });

          if (userFound) {
            await prisma.collaborators.create({
              data: {
                repo_id: repo.id,
                user_id: userFound.id,
              },
            });

            console.log(`Colaborador ${collaboratorsCount} criado`);
            collaboratorsCount++;
          }
        }
      }
    } catch (error: any) {
      console.log(error);
    }
  }
}

consumptionCollaborators();
