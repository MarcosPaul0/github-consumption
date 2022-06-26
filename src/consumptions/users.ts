import { getAllUsers, getUser } from "../calls";
import prisma from "../prisma";
import { User } from "../types";

async function consumptionUsers() {
  let count = 1;

  for (let page = 0; page < 1530; page += 102) {
    const allUsers = await getAllUsers(page);

    // iteração sobre todos os usúario retornados da api
    allUsers.forEach(async (user: User) => {
      const oneUser = await getUser(user.login);

      try {
        // registro o usuário no banco de dados
        await prisma.users.create({
          data: {
            login: oneUser.login,
            name: oneUser.name,
            avatar_url: oneUser.avatar_url,
            html_url: oneUser.html_url,
            url: oneUser.url,
            site_admin: oneUser.site_admin,
            bio: oneUser.bio,
            location: oneUser.location,
            type: oneUser.type,
            created_at: oneUser.created_at,
            updated_at: oneUser.updated_at,
          },
        });

        console.log(`Novo usuário criado ${count}`);
        count++;
      } catch (error: any) {
        console.log(error);
      }
    });
  }
}

consumptionUsers();
