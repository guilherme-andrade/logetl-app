"use client";

import { ApiClient } from "jsonapi-react";
import { schema } from "./schema";

export const client = new ApiClient({
  url: process.env.API_URL || "http://acme.logetl.test:4000/api",
  schema,
});

export { useQuery, useMutation } from "jsonapi-react";
