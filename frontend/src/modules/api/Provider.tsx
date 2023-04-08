"use client";

import { ApiProvider } from "jsonapi-react";
import { FC, ReactNode } from "react";
import { client } from ".";

export const Provider: FC<{ children: ReactNode }> = ({ children }) => {
  return <ApiProvider client={client}>{children}</ApiProvider>;
};
