type ParamsType = {
  url: string;
  method?: "GET" | "POST";
}

export const typedFetchWrapper = async <T>(options: ParamsType): Promise<T> => {
  const response = await fetch(options.url, {
    method: options.method
  });

  const data = await response.json();

  return data;
}