"use client";

import { ApiClient } from "jsonapi-react";
import { schema } from "./schema";

const fetchWithAuth = async (url: string, options: any) => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  console.log(headers);
  const response = await fetch(url, {
    ...options,
    headers: { ...options.headers, ...headers },
  });

  if (response.status === 401) {
    window.location.href = "/users/login";
  }

  return response;
};

export const client = new ApiClient({
  url: window.location.origin + "/api",
  schema,
  fetch: fetchWithAuth,
});

export { useQuery, useMutation } from "jsonapi-react";
