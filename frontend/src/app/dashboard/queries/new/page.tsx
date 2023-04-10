"use client";
import { Fragment, useEffect, useState } from "react";

import { useMutation, useQuery } from "@/modules/data";
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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  InputRightElement,
} from "@/modules/ui";
import { ChevronDown, ExternalLink, Folder } from "@/modules/ui/icons";
import NextLink from "next/link";
import { createRegexSelectorService, useAiMutation } from "@/modules/ai";
import { useRouter } from "next/navigation";
import { Logfile, Query } from "@/modules/data/types";

const Logs = () => {
  const { data, isLoading, error } = useQuery<Logfile[]>("logfiles");
  const [activeFiles, setActiveFile] = useState<Logfile[]>(data || []);
  const [queryTitle, setQueryTitle] = useState("");
  const [isTitleModalOpen, setIsTitleModalOpen] = useState(false);
  const [selectorRegexGeneratorPayload, setSelectorRegexGeneratorPayload] =
    useState<{
      log: string;
      logList: string[];
    } | null>(null);
  const [activeFileMenuOpen, setActiveFileMenuOpen] = useState(false);
  const [selectorRegex, setSelectorRegex] = useState<RegExp | null>(null);
  const [createQuery] = useMutation<Query>("queries", {
    invalidate: ["queries"],
  });
  const router = useRouter();

  const { mutate: createRegexSelector, isLoading: isCreatingSelector } =
    useAiMutation("createRegexSelector", async () => {
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

  const matchesSelector = (log: string) => {
    if (!selectorRegex) return false;

    return selectorRegex.test(log);
  };

  const handleContinue = () => {
    setIsTitleModalOpen(true);
  };

  const handleChangeQueryTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryTitle(e.target.value);
  };

  const handleSaveQuery = (e?: React.MouseEvent) => {
    e?.preventDefault();
    createQuery({
      title: queryTitle,
      selectorRegex: selectorRegex?.toString(),
      logExample: selectorRegexGeneratorPayload?.log,
    }).then(({ data }) => {
      router.push(`/dashboard/queries/${data?.id}`);
    });
  };

  return (
    <>
      <Modal
        isOpen={isTitleModalOpen}
        onClose={() => setIsTitleModalOpen(false)}
        isCentered
        size="lg"
      >
        <ModalOverlay />
        <ModalContent bg="gray.900" color="white" py="5" px="3" mb="48">
          <ModalHeader>
            <ModalCloseButton />
            <Text fontSize="lg" mb="2">
              Set an identifier for your regex.
            </Text>
            <Text color="gray.500" fontSize="md" fontWeight="normal">
              This will make it possible to use it to create other triggers.
            </Text>
          </ModalHeader>
          <ModalBody>
            <InputGroup
              bg="gray.800"
              rounded="md"
              borderColor="gray.700"
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
                placeholder="e.g. 'New user registered'"
                value={queryTitle}
                onChange={handleChangeQueryTitle}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    handleSaveQuery();
                  }
                }}
              />
              <InputRightElement>
                <Button variant="unstyled" onClick={handleSaveQuery}>
                  &rarr;
                </Button>
              </InputRightElement>
            </InputGroup>
            <Text fontSize="xs" color="gray.500" mt="2">
              You can change this later. Press enter to save.
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Grid
        gridTemplateRows="auto 1fr auto"
        h="100%"
        w="100%"
        gridTemplateAreas={`"header" "main" "footer"`}
      >
        <GridItem
          gridArea="footer"
          p="4"
          pb="2"
          fontSize="sm"
          overflowY="scroll"
          bg="gray.900"
          shadow="lg"
          borderColor="gray.800"
          borderBottomWidth="1px"
        >
          <Heading fontSize="md" mb="1">
            Create a regex to match logs for your query.
            <Button
              rightIcon={<Icon as={ExternalLink} w="3" h="3" />}
              as={NextLink}
              href="gitbook.io"
              textDecoration="underline"
              size="xs"
              variant="link"
              ml="2"
            >
              Open docs.
            </Button>
          </Heading>
          <Text color="gray.400" mb="3">
            Please insert a regex expression in the input below, or{" "}
            <Text as="strong">select a log</Text> from the UI above to generate
            it using AI.
          </Text>
          <Flex mb="2">
            <InputGroup size="sm" rounded="md" mr="2">
              {isCreatingSelector && (
                <InputLeftElement pointerEvents="none">
                  <Spinner size="xs" />
                </InputLeftElement>
              )}
              <Input
                disabled={isCreatingSelector}
                placeholder="Insert your regex here"
                value={selectorRegex?.toString() || ""}
                fontFamily="menlo"
                onChange={(e) => {
                  setSelectorRegex(new RegExp(e.target.value));
                }}
              />
            </InputGroup>
            <Button
              size="sm"
              onClick={handleContinue}
              isDisabled={!selectorRegex?.toString()}
            >
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
                      fontFamily="menlo"
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
                      _hover={{
                        borderColor: "gray.600",
                        background: "gray.700",
                      }}
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
          gridArea="header"
          bg="gray.900"
          px="2"
          shadow="lg"
          borderTop="1px"
          borderTopColor="gray.800"
          pb="2"
        >
          {activeFiles && data && (
            <>
              <Button
                rightIcon={<ChevronDown />}
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
                      colorScheme="gray.900"
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
    </>
  );
};

export default Logs;
