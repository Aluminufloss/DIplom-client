import "server-only";
import { serverSideFetch } from "./serverSideFetch";
import { ListsServerResponseType } from "@/models";

const getUserLists = async (options?: {
  accessToken?: string;
  refreshToken?: string;
}): Promise<ListsServerResponseType | undefined> => {
  "use server";
  const response = await serverSideFetch<ListsServerResponseType>({
    url: "http://localhost:5000/get/lists",
    method: "POST",
    body: options,
  });

  const listsData = await response?.json();

  return listsData;
};

export default getUserLists;
