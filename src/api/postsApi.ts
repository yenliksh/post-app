import { paths } from "./types";
import { API_URL } from "../constants";
import apiClient from "./apiClient";

export type PostDto =
  paths["/posts"]["get"]["responses"]["200"]["content"]["application/json"][number];

export const fetchPosts = async (
  page: number,
  limit: number
): Promise<PostDto[]> => {
  const response = await apiClient.get<PostDto[]>(
    `${API_URL}?_page=${page}&_limit=${limit}`
  );
  return response.data;
};
