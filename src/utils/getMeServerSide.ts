"only-server";

import { redirect } from "next/navigation";

import { UserResponseType } from "@/models";
import { serverSideFetch } from "./serverSideFetch";

const getMeServerSide = async (): Promise<UserResponseType | undefined> => {
  "use server"

  const response = await serverSideFetch<UserResponseType>({
    url: "http://localhost:5000/me",
    method: "POST",
  });

  if (!response) {
    redirect("/login");
  }

  return response;
}

export default getMeServerSide;