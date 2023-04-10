"use client";

import { useQuery } from "@/modules/data";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Spinner,
  Text,
  VStack,
  Card,
  Flex,
  Button,
  HStack,
  LinkOverlay
} from "@/modules/ui";
import NextLink from "next/link";

const GRID = "35px 2fr 1fr 1fr 1fr 30px";

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
    <Box p="4">
      <Flex justifyContent="space-between" alignItems="center" mb="8">
        <Box>
          <Heading size="md" w="fit-content" mb="6" pb="4">
            Your Queries
          </Heading>
        </Box>
        <HStack spacing="4">
          <Button size="sm" colorScheme="outline">
            cona
          </Button>
          <Button
            size="sm"
            colorScheme="gray.900"
            as={NextLink}
            href="/dashboard/queries/new"
          >
            New Query
          </Button>
        </HStack>
      </Flex>

      <VStack spacing="2" fontSize="sm">
        <Grid
          display="inline-grid"
          gridTemplateColumns={GRID}
          w="full"
          textTransform="uppercase"
          fontSize="2xs"
          fontWeight="bold"
          color="gray.500"
        >
          <GridItem />
          <GridItem>Title</GridItem>
          <GridItem>Matches</GridItem>
          <GridItem>% of logs</GridItem>
          <GridItem>Events Triggered</GridItem>
        </Grid>

        {data?.map((query) => (
          <Card w="full" key={query.id} shadow="sm" transition="all 0.2s">
            <Grid
              as={NextLink}
              display="inline-grid"
              gridTemplateColumns={GRID}
              cursor="pointer"
              href={`/dashboard/queries/${query.id}`}
            >
              <GridItem display="flex" alignItems="center" pl="4">
                <Box bg="green.300" h="5px" w="5px" rounded="50%" />
              </GridItem>
              <GridItem py="2">
                <Text fontWeight="bold">{query.title}</Text>
              </GridItem>
              <GridItem py="2">
                <Text>{query.title}</Text>
              </GridItem>
              <GridItem py="2">
                <Text>{query.title}</Text>
              </GridItem>
              <GridItem py="2">
                <Text>{query.title}</Text>
              </GridItem>
              <GridItem py="2">...</GridItem>
            </Grid>
          </Card>
        ))}
      </VStack>
    </Box>
  );
};

export default Page;
