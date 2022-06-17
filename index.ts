import { api } from './api';
import prisma from './prisma';
import { Orgs, Repository, User } from './types';

async function getRepositories(user: string): Promise<Repository[]> {
  const response = await api.get(`/users/${user}/repos`);

  return response.data;
}

async function getCommits(user: string, repo: string) {
  const response = await api.get(`/repos/${user}/${repo}/commits`);

  return response.data;
}

async function getUsers(page: number): Promise<User[]> {
  const response = await api.get(`/users?per_page=100&page=${page}&type=user`);

  return response.data;
}

async function getOrgs(page: number): Promise<Orgs[]> {
  const response = await api.get(`/organizations?per_page=100&page=${page}`);

  return response.data;
}

async function displayValues() {
  const commits = await getCommits('MarcosPaul0', 'socket');

  console.log(commits);

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