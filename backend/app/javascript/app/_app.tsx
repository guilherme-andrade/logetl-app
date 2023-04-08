import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { ApiClient, ApiProvider } from "jsonapi-react";
import { baseUrl, schema } from "../api";

const client = new ApiClient({
  url: baseUrl,
  schema,
});

const app = (Component) => (props) => {
  return (
    <ApiProvider client={client}>
      <ChakraProvider>
        <Component {...props} />
      </ChakraProvider>
    </ApiProvider>
  );
};

export default app;
