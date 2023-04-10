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
} from "@/modules/ui";
import { useParams } from "next/navigation";
import { useQuery } from "@/modules/data";
import { Query } from "@/modules/data/types";

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

      <Box>
        <Text mb="3">Triggers</Text>
      </Box>
    </>
  );
};

export default Page;
