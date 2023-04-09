"use client";

import { ReactNode, FC } from "react";
import { QueryClientProvider, QueryClient } from "react-query";

interface Props {
  children: ReactNode;
}

export const AiProvider: FC<Props> = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
