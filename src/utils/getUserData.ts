import "server-only";
import { redirect } from "next/navigation";

import { serverSideFetch } from "./serverSideFetch";
import { UserResponseType } from "@/models";

const getUserData = async (): Promise<UserResponseType> => {
  const response = await serverSideFetch<UserResponseType>({
    url: "http://localhost:5000/me",
    method: "POST",
  });

  
  if (!response) {
    redirect("/login");
  }

  return response;
}

export default getUserData;