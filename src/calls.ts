import { CodeFrequency, Licenses, Repositories, Users } from "@prisma/client";
import { api } from "./api";
import { Orgs, Repository, User } from "./types";

// chamada na api que busca todos usuários por página
export async function getAllUsers(page: number): Promise<User[]> {
  const response = await api.get(`/users?per_page=100&since=${page}&type=user`);

  return response.data;
}

// chamada na api que busca todas organizações
export async function getAllOrganizations() {
  const response = await api.get("/organizations");

  return response.data;
}

// chamada na api que busca um usuário
export async function getUser(login: string): Promise<Users> {
  const response = await api.get(`/users/${login}`);

  return response.data;
}

// chamada na api que busca os seguidores de um usuário
export async function getUserFollowers(login: string): Promise<User[]> {
  const response = await api.get(`/users/${login}/followers`);

  return response.data;
}

// chamada na api que busca todas as licensas
export async function getAllLicenses(): Promise<Licenses[]> {
  const response = await api.get("/licenses");

  return response.data;
}

// chamada na api que busca repositórios de um usuário
export async function getAllUserRepositories(login: string): Promise<Repository[]> {
  const response = await api.get(`/users/${login}/repos?per_page=10`);

  return response.data;
}

// chamada na api que busca um repositório
export async function getRepository(
  login: string,
  repositoryName: string
): Promise<Repository> {
  const response = await api.get(`/repos/${login}/${repositoryName}`);

  return response.data;
}

// chamada na api que busca a frequência de código de um repositório 
export async function getCodeFrequency(login: string, repositoryName: string): Promise<[number, number, number][]> {
  const response = await api.get(
    `/repos/${login}/${repositoryName}/stats/code_frequency`
  );

  return response.data;
}

// chamada na api que busca os colaboradores de um repositório
export async function getCollaborators(login: string, repositoryName: string): Promise<User[]> {
  const response = await api.get(
    `/repos/${login}/${repositoryName}/contributors`
  );

  return response.data;
}
