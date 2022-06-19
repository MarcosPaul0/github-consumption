import { api } from './api';
import prisma from './prisma';
import { Orgs, Repository, User } from './types';

async function getAllUsers(page: number): Promise<User[]> {
  const response = await api.get(`/users?per_page=100&page=${page}&type=user`);

  return response.data;
}

async function getUser(login: string): Promise<User> {
  const response = await api.get(`/users/${login}`);

  return response.data;
}

async function getUserFollowers(login: string): Promise<User> {
  const response = await api.get(`/users/${login}/followers`);

  return response.data;
}

async function getAllOrgs(page: number): Promise<Orgs[]> {
  const response = await api.get(`/users?per_page=100&page=${page}&type=organization`);

  return response.data;
}

async function getAllUserRepositories(login: string): Promise<Repository[]> {
  const response = await api.get(`/user/${login}/repos`);

  return response.data;
}

async function getRepository(login: string, repositoryName: string): Promise<Repository[]> {
  const response = await api.get(`/repos/${login}/${repositoryName}`);

  return response.data;
}

async function getCodeFrequency(login: string, repositoryName: string) {
  const response = await api.get(`/repos/${login}/${repositoryName}/stats/code_frequency`)

  return response.data;
}

async function getAllLicenses() {
  const response = await api.get('/licenses');

  return response.data;
}

async function getAllEvents() {
  const response = await api.get('/events');

  return response.data;
}

async function consumption() {
  const allLicenses = await getAllLicenses();

  const licensesCreated = await prisma.licenses.createMany(allLicenses);

  for (let page = 0; page < 100; page++) {
    const allUsers = await getAllUsers(page);

    allUsers.forEach(async (user: User) => {
      const oneUser = await getUser(user.login);

      const userRepositories = await getAllUserRepositories(user.login);

      userRepositories.forEach(async (repository: Repository) => {
        const oneRepository = await getRepository(user.login, repository.name);
      });
    });
  }
}

consumption();