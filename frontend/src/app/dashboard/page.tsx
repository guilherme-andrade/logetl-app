"use client";

import { useQuery } from "@/modules/api";
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
  Icon,
} from "@/modules/ui";

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
    <>
      <Flex justifyContent="space-between" mb="8">
        <Box>
          <Heading size="md" w="fit-content" mb="6" pb="4">
            Your Queries
          </Heading>
        </Box>
        <Box>
          <Button size="sm" colorScheme="black">
            New Query
          </Button>
        </Box>
      </Flex>

      <VStack spacing="2">
        <Grid
          display="inline-grid"
          gridTemplateColumns={GRID}
          w="full"
          textTransform="uppercase"
          fontSize="2xs"
          fontWeight="bold"
          color="gray.500"
          borderBottomWidth="1px"
          borderColor="gray.200"
          pb="4"
        >
          <GridItem />
          <GridItem>Title</GridItem>
          <GridItem>Matches</GridItem>
          <GridItem>% of logs</GridItem>
          <GridItem>Events Triggered</GridItem>
        </Grid>

        {data?.map((query) => (
          <Card
            shadow="none"
            border="none"
            w="full"
            key={query.id}
            rounded="none"
          >
            <Grid
              display="inline-grid"
              gridTemplateColumns={GRID}
              cursor="pointer"
            >
              <GridItem py="4" display="flex" alignItems="center">
                <Box bg="green.300" h="5px" w="5px" rounded="50%" />
              </GridItem>
              <GridItem py="4">
                <Text fontWeight="bold">{query.title}</Text>
              </GridItem>
              <GridItem py="4">
                <Text>{query.title}</Text>
              </GridItem>
              <GridItem py="4">
                <Text>{query.title}</Text>
              </GridItem>
              <GridItem py="4">
                <Text>{query.title}</Text>
              </GridItem>
              <GridItem py="4">...</GridItem>
            </Grid>
          </Card>
        ))}
      </VStack>
    </>
  );
};

export default Page;
