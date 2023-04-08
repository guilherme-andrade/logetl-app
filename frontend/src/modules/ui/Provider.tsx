"use client";
import { FC, ReactNode } from "react";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { theme } from "./theme";

interface Props {
  children: ReactNode;
}

export const UIProvider: FC<Props> = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      {children}
    </ChakraProvider>
  );
};
