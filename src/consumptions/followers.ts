import { Users } from "@prisma/client";
import { getUser, getUserFollowers } from "../calls";
import prisma from "../prisma";

async function registerFollowers() {
  let userCount = 1;
  let followerCount = 1;

  const allUsersCreated = await prisma.users.findMany();

  allUsersCreated.forEach(async (user: Users) => {
    const allFollowers = await getUserFollowers(user.login);

    allFollowers.slice(0, 10).forEach(async (follower) => {
      const followerFound = await prisma.users.findFirst({
        where: { login: follower.login },
      });

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
