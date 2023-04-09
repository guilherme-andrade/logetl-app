"use client";

import { useQuery } from "@/modules/api";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  Link,
  Spacer,
  VStack,
  Text,
} from "@/modules/ui";

const Login = () => {
  const { data } = useQuery("queries");
  return (
    <Container
      minH="100vh"
      maxW="container.sm"
      mt={{ base: 20, lg: 48 }}
      shadow="sm"
    >
      <Box
        p={{ base: 4, lg: 8 }}
        borderWidth="1px"
        borderColor="black"
        rounded="md"
        w="full"
        bg="white"
      >
        <Heading size="md">Login</Heading>
        <Spacer h="6" />
        <VStack spacing="4">
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <InputGroup>
              <Input
                type="email"
                name="email"
                placeholder="bruce.wayne@waynecorp.com"
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <InputGroup>
              <Input type="password" name="password" placeholder="********" />
            </InputGroup>
          </FormControl>
          <Button w="full" colorScheme="black">
            Submit
          </Button>
          <Box textAlign="left" w="full">
            <Text my="3">
              Don&apos;t have an account?{" "}
              <Link href="/register" textDecor="underline">
                Register
              </Link>
            </Text>
            <Text>
              Forgot your password?{" "}
              <Link href="/forgot-password" textDecor="underline">
                Reset
              </Link>
            </Text>
          </Box>
        </VStack>
      </Box>
    </Container>
  );
};

export default Login;
