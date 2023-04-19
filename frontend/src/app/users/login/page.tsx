"use client";

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
  useToast,
} from "@/modules/ui";
import { useForm } from "react-hook-form";

type Login = {
  email: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit } = useForm<Login>();
  const toast = useToast();

  const onSubmit = async (data: Login) => {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const body = await response.json();
      localStorage.setItem("token", body.token);
      window.location.href = "/dashboard";
    } else {
      toast({ title: "Invalid credentials", status: "error" });
    }
  };

  return (
    <Container minH="100vh" maxW="container.sm" mt={{ base: 20, lg: 48 }}>
      <Box
        p={{ base: 4, lg: 8 }}
        borderWidth="1px"
        borderColor="gray.700"
        rounded="lg"
        w="full"
        bg="gray.900"
        shadow="sm"
      >
        <Heading size="md">Login</Heading>
        <Spacer h="6" />
        <VStack spacing="4">
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <InputGroup>
              <Input
                type="email"
                placeholder="bruce.wayne@waynecorp.com"
                {...register("email")}
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <InputGroup>
              <Input
                type="password"
                placeholder="********"
                {...register("password")}
              />
            </InputGroup>
          </FormControl>
          <Button
            w="full"
            colorScheme="gray.900"
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </Button>
          <Box textAlign="left" w="full" fontSize="sm">
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
