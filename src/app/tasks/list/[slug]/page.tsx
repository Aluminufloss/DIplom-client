import { notFound } from "next/navigation";

import getUserLists from "@/utils/getUserLists";

import ListTaskSection from "@/components/Tasks/Tasks/LIstTaskSection";

export default async function ListPage({
  params,
}: {
  params: { slug: string };
}) {
  const userListsResponse = await getUserLists();

  if (!userListsResponse) {
    notFound();
  }

  const userLists = userListsResponse.data;

  const listById = userLists.find((list) => list.listId === params.slug);

  if (!listById) {
    notFound();
  }

  return <ListTaskSection listById={listById} lists={userLists} />;
}
