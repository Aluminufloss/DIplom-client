import "server-only";
import { serverSideFetch } from "./serverSideFetch";
import { ListsServerResponseType } from "@/models";

const getUserLists = async (): Promise<ListsServerResponseType | undefined> => {
  "use server"
  const response = await serverSideFetch<ListsServerResponseType>({
    url: "http://localhost:5000/get/lists",
    method: "POST",
  });

  return response;
}

export default getUserLists;