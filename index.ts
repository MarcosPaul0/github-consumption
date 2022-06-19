import { api } from './api';
import prisma from './prisma';
import { Orgs, Repository, User } from './types';

async function getAllUsers(page: number): Promise<User[]> {
  const response = await api.get(`/users?per_page=100&page=${page}&type=user`);

  return response.data;
}

async function getUser(userName: string): Promise<User> {
  const response = await api.get(`/users/${userName}`);

  return response.data;
}

async function getAllOrgs(page: number): Promise<Orgs[]> {
  const response = await api.get(`/organizations?per_page=100&page=${page}`);

  return response.data;
}

async function getRepository(user: string, repositoryName: string): Promise<Repository[]> {
  const response = await api.get(`/repos/${user}/${repositoryName}`);

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

async function displayValues() {
  // for (let page = 0; page < 1000; page++) {
  //   const users = await getUsers(page);

  //   users.forEach(async (user: User) => {
  //     const repos = await getRepositories(user.login);

  //     await prisma.user.create({
  //       data: {}
  //     });

  //     repos.forEach(async (repo) => {
  //       await prisma.repository.create({
  //         data: {}
  //       });
  //     });
  //   });
  // }
}

displayValues();