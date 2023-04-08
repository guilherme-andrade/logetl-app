"use client";

import { useQuery } from "@/modules/api";
import { Box, Container, Heading } from "@/modules/ui";

const Login = () => {
  const { data } = useQuery("queries");
  return (
    <Container
      minH="100vh"
      maxW="container.sm"
      mt={{ base: 20, lg: 48 }}
      shadow="sm"
    >
      <Box p={{ base: 4, lg: 8 }} borderWidth="1px" rounded="md" w="full">
        <Heading>Login</Heading>
      </Box>
    </Container>
  );
};

export default Login;
