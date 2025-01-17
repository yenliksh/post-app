// postApi.ts
import axios from "axios";
import { paths } from "./types";
import { API_URL } from "../constants";

export type PostDto =
  paths["/posts"]["get"]["responses"]["200"]["content"]["application/json"][number];

export async function fetchPosts(params?: {
  page?: number;
  limit?: number;
}): Promise<PostDto[]> {
  try {
    const { page = 1, limit = 10 } = params || {};
    const response = await axios.get<PostDto[]>(
      `${API_URL}?_page=${page}&_limit=${limit}`
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error);
      const message =
        error.response?.data?.message ||
        `API Error: ${error.response?.status || "Unknown status"}`;
      throw new Error(message);
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred while fetching posts");
    }
  }
}
