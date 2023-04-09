"use client";
import { useEffect, useState } from "react";

import { useQuery } from "@/modules/api";
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Divider,
  Flex,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Icon,
  Input,
  InputGroup,
  Text,
  Link,
} from "@/modules/ui";
import { ChevronDown, ExternalLink, Folder } from "@/modules/ui/icons";
import NextLink from "next/link";

interface Logfile {
  id: string;
  name: string;
  content: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

const Logs = () => {
  const { data, isLoading, error } = useQuery<Logfile[]>("logfiles");
  const [activeFiles, setActiveFile] = useState<Logfile[]>(data || []);
  const [selectedLog, setSelectedLog] = useState<string | null>(null);
  const [activeFileMenuOpen, setActiveFileMenuOpen] = useState(false);

  useEffect(() => {
    if (data) {
      setActiveFile(data);
    }
  }, [data]);

  if (isLoading || error) return <div>Loading...</div>;

  const handleSelectFile = (file: Logfile) => (e: React.ChangeEvent) => {
    if (!e.target["checked"]) {
      setActiveFile((prev) => prev.filter((f) => f.id !== file.id));
    } else {
      setActiveFile((prev) => [...prev, file]);
    }
  };

  return (
    <Grid
      gridTemplateRows="auto 1fr auto"
      h="100%"
      w="100%"
      gridTemplateAreas={`"header" "main" "input"`}
      bg="gray.900"
      color="white"
    >
      <GridItem
        gridArea="header"
        p="4"
        pb="2"
        fontSize="sm"
        overflowY="scroll"
        bg="black"
        shadow="lg"
        borderColor="gray.800"
        borderBottomWidth="1px"
      >
        <Heading fontSize="md" mb="1">
          1. Provide an example log
        </Heading>
        <Text color="gray.400" mb="2">
          Search your logs and select one that serves as an example for your
          query, or paste your own in the box below. Logetl AI will take care of
          the rest.{" "}
          <Link as={NextLink} href="gitbook.io" textDecoration="underline">
            Read the docs.
            <Icon as={ExternalLink} w="4" h="4" />
          </Link>
        </Text>
        <Flex mb="2">
          <Input
            size="sm"
            bg="gray.900"
            rounded="md"
            borderColor="gray.800"
            mr="2"
            _focus={{
              borderColor: "white",
              boxShadow: "none",
            }}
            placeholder="No log selected"
            value={selectedLog || undefined}
          />
          <Button size="sm" variant="outline" _hover={{ bg: "gray.700" }}>
            Continue &rarr;
          </Button>
        </Flex>
        {activeFiles && data && (
          <>
            <Button
              rightIcon={<ChevronDown />}
              size="xs"
              variant="unstyled"
              mt="2"
              leftIcon={<Folder />}
              alignItems="center"
              onClick={() => setActiveFileMenuOpen(!activeFileMenuOpen)}
            >
              {activeFiles[0] && activeFiles[0].name}
            </Button>
            <Collapse in={activeFileMenuOpen}>
              {data.map((file) => (
                <Flex
                  key={file.id}
                  mt="2"
                  alignItems="center"
                  fontWeight="normal"
                  fontSize="xs"
                >
                  <Checkbox
                    colorScheme="black"
                    size="sm"
                    mr="2"
                    isChecked={activeFiles.some((f) => f.id === file.id)}
                    onChange={handleSelectFile(file)}
                  />
                  {file.name}
                </Flex>
              ))}
            </Collapse>
          </>
        )}
      </GridItem>
      {activeFiles && (
        <GridItem
          gridArea="main"
          p="2"
          fontSize="xs"
          overflowY="scroll"
          as="pre"
          position="relative"
        >
          {activeFiles.map((file) => (
            <>
              {file.content
                .split("\n")
                .filter((line) => line.trim().length > 0)
                .map((line, i) => (
                  <Box
                    key={i}
                    mb="2px"
                    p="1"
                    borderWidth="1px"
                    borderColor={
                      line === selectedLog ? "gray.600" : "transparent"
                    }
                    bg={line === selectedLog ? "gray.700" : "transparent"}
                    color={line === selectedLog ? "white" : "gray.500"}
                    _hover={{ borderColor: "gray.600", background: "gray.700" }}
                    lineHeight="0.8"
                    cursor="pointer"
                    rounded="sm"
                    transition="all 0.1s"
                    onClick={() => setSelectedLog(line)}
                  >
                    {line}
                  </Box>
                ))}
            </>
          ))}
        </GridItem>
      )}
      <GridItem
        gridArea="input"
        bg="black"
        p="2"
        shadow="lg"
        borderTop="1px"
        borderTopColor="gray.800"
      >
        <Flex flexDirection="column" h="full">
          <Box>
            <FormLabel fontSize="sm" mb="1" p="0">
              Search
            </FormLabel>
          </Box>
          <InputGroup
            bg="gray.900"
            borderColor="gray.800"
            borderWidth="1px"
            rounded="md"
            flexGrow="1"
            alignItems="center"
            pr="1"
          >
            <Input
              p="2"
              variant="unstyled"
              placeholder="e.g. /users/login"
              fontSize="sm"
              _focus={{ borderColor: "white", boxShadow: "none" }}
            />
          </InputGroup>
          <Text color="gray.500" fontSize="xs" mt="1">
            loremFugiat magna commodo enim sit culpa reprehenderit nostrud dolor
            sunt sint laboris.
          </Text>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default Logs;
