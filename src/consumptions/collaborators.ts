import { getCollaborators } from "../calls";
import prisma from "../prisma";

async function consumptionCollaborators() {
  let repoCount = 0;
  let collaboratorsCount = 0;

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
    try {
      const allCollaborators = await getCollaborators(
        repo.owner.login,
        repo.name
      );

      console.log(`Repositório ${repoCount}`);
      repoCount++;

      // se existir colaboradores busca se o usuário já existe no banco de dados
      if (allCollaborators && allCollaborators?.length > 0) {
        for (const [index, collaborator] of allCollaborators.entries()) {
          const userFound = await prisma.users.findFirst({
            where: {
              login: collaborator.login,
            },
          });

          // se o usuário existir registra como novo colaborador
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
