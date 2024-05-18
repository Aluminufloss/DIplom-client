const getInitialListId = (): string[] => {
  if (typeof window !== "undefined") {
    const url = new URL(window.location.href);
    const pathSegments = url.pathname.split("/");

    const listId = pathSegments[pathSegments.length - 1];

    return [listId] || [];
  }

  return [];
};

export default getInitialListId;
