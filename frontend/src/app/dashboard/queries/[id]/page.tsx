"use client";

import {
  Box,
  Heading,
  Spinner,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Textarea,
  VStack,
  Grid,
  GridItem,
  Card,
  Flex,
  Button,
} from "@/modules/ui";
import { useParams } from "next/navigation";
import { useQuery } from "@/modules/data";
import { Query } from "@/modules/data/types";
import { Plus } from "@/modules/ui/icons";

const Page = () => {
  const params = useParams();
  const { data, isLoading } = useQuery<Query>(["queries", params?.id]);

  if (isLoading || !data) {
    return <Spinner />;
  }

  return (
    <>
      <Box p="4" bg="gray.900">
        <Box mb="3">
          <Breadcrumb fontSize="sm">
            <BreadcrumbItem>
              <BreadcrumbLink>queries</BreadcrumbLink>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbLink>{data.title}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>
        <Heading mb="2">{data.title}</Heading>
        <Text fontSize="xs" mb="1">
          Regex (click to edit)
        </Text>
        <Textarea
          color="gray.500"
          value={data.selectorRegex}
          fontFamily="menlo"
          size="xs"
          rows={2}
          borderColor="gray.800"
          _focus={{ color: "white" }}
        />
      </Box>

      <Box px="4" py="8">
        <Flex justifyContent="space-between">
          <Box>
            <Heading mb="2" fontSize="md">
              Triggers
            </Heading>
            <Text mb="4" fontSize="sm">
              Triggers publish events when the query is matched.
              <br />
              Create a trigger to define the payload of the event extracted from
              the log.
            </Text>
          </Box>
          <Button size="sm" leftIcon={<Plus />}>
            Add trigger
          </Button>
        </Flex>
        <VStack spacing="2" fontSize="sm">
          <Grid
            display="inline-grid"
            w="full"
            textTransform="uppercase"
            fontSize="2xs"
            fontWeight="bold"
            color="gray.500"
          >
            <GridItem />
          </Grid>

          <Card w="full" shadow="sm" transition="all 0.2s">
            <Grid display="inline-grid" cursor="pointer">
              <GridItem display="flex" alignItems="center" pl="4">
                <Box bg="green.300" h="5px" w="5px" rounded="50%" />
              </GridItem>
            </Grid>
          </Card>
        </VStack>
      </Box>
    </>
  );
};

export default Page;
