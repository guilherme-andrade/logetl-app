"use client";
import { Fragment, useEffect, useState } from "react";

import { useQuery } from "@/modules/api";
import {
  Button,
  Checkbox,
  Collapse,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Input,
  Text,
  Link,
  InputGroup,
  Spinner,
  InputLeftElement,
} from "@/modules/ui";
import { ChevronUp, ExternalLink, Folder } from "@/modules/ui/icons";
import NextLink from "next/link";
import {
  createRegexSelector as createRegexSelectorService,
  useMutation,
} from "@/modules/ai";

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
  const [selectorRegexGeneratorPayload, setSelectorRegexGeneratorPayload] =
    useState<{
      log: string;
      logList: string[];
    } | null>(null);
  const [activeFileMenuOpen, setActiveFileMenuOpen] = useState(false);
  const [selectorRegex, setSelectorRegex] = useState<RegExp | null>(null);

  const { mutate: createRegexSelector, isLoading: isCreatingSelector } =
    useMutation("createRegexSelector", async () => {
      if (!selectorRegexGeneratorPayload) return;

      try {
        const data = await createRegexSelectorService(
          selectorRegexGeneratorPayload
        );
        setSelectorRegex(new RegExp(data.result));
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    });

  useEffect(() => {
    if (data) {
      setActiveFile(data);
    }
  }, [data]);

  useEffect(() => {
    if (selectorRegexGeneratorPayload?.logList.length) {
      createRegexSelector();
    }
  }, [createRegexSelector, selectorRegexGeneratorPayload]);

  if (isLoading || error) return <div>Loading...</div>;

  const handleSelectFile = (file: Logfile) => (e: React.ChangeEvent) => {
    if (!e.target.checked) {
      setActiveFile((prev) => prev.filter((f) => f.id !== file.id));
    } else {
      setActiveFile((prev) => [...prev, file]);
    }
  };

  const handleChangeLog = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectorRegexGeneratorPayload((prev) => ({
      logList: [],
      ...prev,
      log: e.target.value,
    }));
  };

  const matchesSelector = (log: string) => {
    if (!selectorRegex) return false;

    return selectorRegex.test(log);
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
          1. Use regex to select logs.
        </Heading>
        <Text color="gray.400" mb="3">
          Please insert a regex expression in the input below, or select a log
          from the files displayed below to use AI to automatically generate it.{" "}
          <Link as={NextLink} href="gitbook.io" textDecoration="underline">
            Read the docs.
            <Icon as={ExternalLink} w="4" h="4" />
          </Link>
        </Text>
        <Flex mb="2">
          <InputGroup
            size="sm"
            bg="gray.900"
            rounded="md"
            borderColor="gray.800"
            mr="2"
            _focus={{
              borderColor: "white",
              boxShadow: "none",
            }}
          >
            {isCreatingSelector && (
              <InputLeftElement pointerEvents="none">
                <Spinner size="xs" />
              </InputLeftElement>
            )}
            <Input
              disabled={isCreatingSelector}
              placeholder="Insert your regex here"
              value={selectorRegex?.toString() || ""}
              onChange={(e) => {
                setSelectorRegex(new RegExp(e.target.value));
              }}
            />
          </InputGroup>
          <Button size="sm" variant="outline" _hover={{ bg: "gray.700" }}>
            Continue &rarr;
          </Button>
        </Flex>
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
            <Fragment key={file.id}>
              {file.content
                .split("\n")
                .filter((log) => log.trim().length > 0)
                .map((log, i) => (
                  <Text
                    key={i}
                    mb="2px"
                    p="1"
                    borderWidth="1px"
                    borderColor={
                      log === selectorRegexGeneratorPayload?.log ||
                      matchesSelector(log)
                        ? "gray.600"
                        : "transparent"
                    }
                    bg={
                      log === selectorRegexGeneratorPayload?.log ||
                      matchesSelector(log)
                        ? "gray.700"
                        : "transparent"
                    }
                    color={
                      log === selectorRegexGeneratorPayload?.log ||
                      matchesSelector(log)
                        ? "white"
                        : "gray.500"
                    }
                    _hover={{ borderColor: "gray.600", background: "gray.700" }}
                    lineHeight="0.8"
                    cursor="pointer"
                    rounded="sm"
                    transition="all 0.1s"
                    minW="fit-content"
                    maxW="full"
                    onClick={() =>
                      setSelectorRegexGeneratorPayload({
                        log: log,
                        logList: file.content.split("\n"),
                      })
                    }
                  >
                    {log}
                  </Text>
                ))}
            </Fragment>
          ))}
        </GridItem>
      )}
      <GridItem
        gridArea="input"
        bg="black"
        px="2"
        shadow="lg"
        borderTop="1px"
        borderTopColor="gray.800"
        pb="2"
      >
        {activeFiles && data && (
          <>
            <Button
              rightIcon={<ChevronUp />}
              size="xs"
              variant="unstyled"
              leftIcon={<Folder />}
              alignItems="center"
              onClick={() => setActiveFileMenuOpen(!activeFileMenuOpen)}
              color="gray.500"
              w="full"
              textAlign="left"
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
                  color="gray.500"
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
    </Grid>
  );
};

export default Logs;
