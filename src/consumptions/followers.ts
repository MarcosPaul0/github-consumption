import { Users } from "@prisma/client";
import { getUser, getUserFollowers } from "../calls";
import prisma from "../prisma";

async function registerFollowers() {
  let userCount = 1;
  let followerCount = 1;

  // busca todos usuários registrados no banco de dados ordenado pela data de criação
  const allUsersCreated = await prisma.users.findMany({
    orderBy: {
      created_at: "desc",
    },
  });

  // iteração sobre todos os usúarios do banco de dados
  allUsersCreated.forEach(async (user: Users) => {
    const allFollowers = await getUserFollowers(user.login);

    // iteração sobre os seguidores do usuário limitado a 10 por usuário
    allFollowers.slice(0, 10).forEach(async (follower) => {
      // busca se o usuário seguidor já existe no banco de dados
      const followerFound = await prisma.users.findFirst({
        where: { login: follower.login },
      });

      // caso não exista registra um novo e usuário e registra como novo seguidor
      if (!followerFound) {
        const userFollower = await getUser(follower.login);

        const followerCreated = await prisma.users.create({
          data: {
            login: userFollower.login,
            name: userFollower.name,
            avatar_url: userFollower.avatar_url,
            html_url: userFollower.html_url,
            url: userFollower.url,
            site_admin: userFollower.site_admin,
            bio: userFollower.bio,
            location: userFollower.location,
            type: userFollower.type,
            created_at: userFollower.created_at,
            updated_at: userFollower.updated_at,
          },
        });

        console.log(`Novo usuário criado ${userCount}`);
        userCount++;

        await prisma.followers.create({
          data: {
            follower_id: followerCreated.id,
            following_id: user.id,
          },
        });

        console.log(`Novo seguidor criado ${followerCount}`);
        followerCount++;
      } else {
        // caso já exista apenas registra como novo seguidor
        await prisma.followers.create({
          data: {
            follower_id: followerFound.id,
            following_id: user.id,
          },
        });

        console.log(`Novo seguidor criado ${followerCount}`);
        followerCount++;
      }
    });
  });
}

registerFollowers();
