"use client";

import { useQuery } from "@/modules/api";
import {
  Box,
  Card,
  Grid,
  GridItem,
  Heading,
  Spinner,
  Text,
  VStack,
} from "@/modules/ui";

const Page = () => {
  const { data, error, isLoading } = useQuery<
    {
      id: string;
      title: string;
      selectorRegex: string;
    }[]
  >("queries");

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Box mb="8">
        <Heading size="md" mb="2">
          Your Queries
        </Heading>
        <Text>You have no queries yet.</Text>
      </Box>

      <VStack spacing="2">
        <Grid
          display="inline-grid"
          gridTemplateColumns={"1fr 300px"}
          w="full"
          textTransform="uppercase"
          fontSize="2xs"
          fontWeight="bold"
          color="gray.500"
        >
          <GridItem px="4">Title</GridItem>
          <GridItem px="4">Selector</GridItem>
        </Grid>

        {data?.map((query) => (
          <Card shadow="none" borderWidth="1px" w="full" key={query.id}>
            <Grid display="inline-grid" gridTemplateColumns={"1fr 300px"}>
              <GridItem p="4">{query.title}</GridItem>
              <GridItem p="4">{query.selectorRegex}</GridItem>
            </Grid>
          </Card>
        ))}
      </VStack>
    </>
  );
};

export default Page;
