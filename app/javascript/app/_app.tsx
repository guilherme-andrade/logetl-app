import React from "react";
import { ChakraProvider } from "@chakra-ui/react";

const app = (Component) => (props) => {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider>
      <Component {...props} />
    </ChakraProvider>
  );
};

export default app;
