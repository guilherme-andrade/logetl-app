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
  Icon,
  HStack,
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

  return <></>;
};

export default Page;
