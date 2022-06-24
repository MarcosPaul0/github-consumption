import { Repositories, Users } from "@prisma/client";
import { api } from "./api";
import { Orgs, Repository, User } from "./types";

export async function getAllUsers(page: number): Promise<User[]> {
  const response = await api.get(`/users?per_page=100&since=${page}&type=user`);

  return response.data;
}

export async function getAllOrganizations() {
  const response = await api.get("/organizations");

  return response.data;
}

export async function getUser(login: string): Promise<Users> {
  const response = await api.get(`/users/${login}`);

  return response.data;
}

export async function getUserFollowers(login: string): Promise<User[]> {
  const response = await api.get(`/users/${login}/followers`);

  return response.data;
}

export async function getUsersFollowing(login: string): Promise<User[]> {
  const response = await api.get(`/users/${login}/followers&per_page=100`);

  return response.data;
}

export async function getAllOrgs(page: number): Promise<Orgs[]> {
  const response = await api.get(
    `/users?per_page=100&page=${page}&type=organization`
  );

  return response.data;
}

export async function getAllUserRepositories(login: string): Promise<Repository[]> {
  const response = await api.get(`/users/${login}/repos?per_page=10`);

  return response.data;
}

export async function getRepository(
  login: string,
  repositoryName: string
): Promise<Repositories | null> {
  const response = await api.get(`/repos/${login}/${repositoryName}`);

  return response.data;
}

export async function getCodeFrequency(login: string, repositoryName: string) {
  const response = await api.get(
    `/repos/${login}/${repositoryName}/stats/code_frequency`
  );

  return response.data;
}

export async function getCollaborators(login: string, repositoryName: string) {
  const response = await api.get(
    `/repos/${login}/${repositoryName}/contributors`
  );

  return response.data;
}

export async function getAllLicenses() {
  const response = await api.get("/licenses");

  return response.data;
}

export async function getAllEvents() {
  const response = await api.get("/events");

  return response.data;
}
