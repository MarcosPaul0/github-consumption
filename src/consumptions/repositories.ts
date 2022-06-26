import { Licenses } from "@prisma/client";
import { getAllUserRepositories, getRepository } from "../calls";
import prisma from "../prisma";

async function repositoriesConsumption() {
  // busca todos os usuários do banco de dados ordenado pela data de criação
  const allUsersCreated = await prisma.users.findMany({
    orderBy: {
      created_at: 'desc',
    }
  });

  // iteração sobre os usuários do banco de dados
  for (const [index, user] of allUsersCreated.entries()) {
    console.log(`Usuário ${index}`);
    const userRepositories = await getAllUserRepositories(user.login);

    // iteração sobre os repositórios do usuário
    for (const [index, repo] of userRepositories.slice(0, 500).entries()) {
      const oneRepository = await getRepository(user.login, repo.name);

      // se o repositório tiver uma licensa cadastrada registra o repositório com a licensa
      if (oneRepository?.license?.key) {
        const license = (await prisma.licenses.findFirst({
          where: {
            key: oneRepository.license.key,
          },
        })) as Licenses;

        try {
          await prisma.repositories.create({
            data: {
              owner_id: user.id,
              license_id: license.id,
              name: oneRepository.name,
              full_name: oneRepository.full_name,
              language: oneRepository.language,
              has_issues: oneRepository.has_issues,
              forks_count: oneRepository.forks_count,
              open_issues_count: oneRepository.open_issues_count,
              watchers_count: oneRepository.watchers_count,
              is_template: oneRepository.is_template,
              private: oneRepository.private,
              html_url: oneRepository.html_url,
              description: oneRepository.description,
              fork: oneRepository.fork,
              url: oneRepository.url,
              size: oneRepository.size,
              created_at: oneRepository.created_at,
              updated_at: oneRepository.updated_at,
              pushed_at: oneRepository.pushed_at,
            },
          });

          console.log(`Novo repositório ${index} criado`);
        } catch (error: any) {
          console.log(error);
        }
      // se não registra apenas o repositório
      } else {
        try {
          await prisma.repositories.create({
            data: {
              owner_id: user.id,
              license_id: null,
              name: oneRepository.name,
              full_name: oneRepository.full_name,
              language: oneRepository.language,
              has_issues: oneRepository.has_issues,
              forks_count: oneRepository.forks_count,
              open_issues_count: oneRepository.open_issues_count,
              watchers_count: oneRepository.watchers_count,
              is_template: oneRepository.is_template,
              private: oneRepository.private,
              html_url: oneRepository.html_url,
              description: oneRepository.description,
              fork: oneRepository.fork,
              url: oneRepository.url,
              size: oneRepository.size,
              created_at: oneRepository.created_at,
              updated_at: oneRepository.updated_at,
              pushed_at: oneRepository.pushed_at,
            },
          });

          console.log(`Novo repositório ${index} criado`);
        } catch (error: any) {
          console.log(error);
        }
      }
    }
  }
}

repositoriesConsumption();
