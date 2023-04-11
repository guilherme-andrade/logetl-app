"use client";

import NextLink from "next/link";
import { useState } from "react";
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
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Divider,
  Input,
  UnorderedList,
  ListItem,
} from "@/modules/ui";
import { useParams } from "next/navigation";
import { useQuery } from "@/modules/data";
import { Query, Trigger } from "@/modules/data/types";
import { Plus, Save } from "@/modules/ui/icons";
import { useAiMutation, createRegexExtractorService } from "@/modules/ai";
import { useMutation } from "@/modules/data";

const GRID = "1fr 1fr";

const Page = () => {
  const params = useParams();
  const { data, isLoading } = useQuery<Query>([
    "queries",
    params?.id,
    {
      include: ["triggers"],
    },
  ]);
  const [isNewTriggerModalOpen, setIsNewTriggerModalOpen] = useState(false);
  const [newTrigger, setNewTrigger] = useState<
    Pick<Trigger, "queryId" | "title" | "extractorRegex">
  >({
    title: "",
    queryId: String(params?.id),
    extractorRegex: "",
  });
  const [createRegexExtractorPayload, setCreateRegexExtractorPayload] =
    useState<{
      log: string;
      properties: string[];
    }>({
      log: String(data?.logExample),
      properties: [],
    });

  const { mutate: createRegexExtractor, isLoading: isCreatingRegexExtractor } =
    useAiMutation(async () => {
      try {
        const result = await createRegexExtractorService({
          ...createRegexExtractorPayload,
          log: String(data?.logExample),
        });
        setNewTrigger((prev) => ({
          ...prev,
          extractorRegex: result.result,
        }));
      } catch (error) {
        console.log(error);
        throw new Error("Error creating regex extractor");
      }
    });

  const [createTrigger, { isLoading: isCreatingTrigger }] =
    useMutation<Trigger>("triggers");

  if (isLoading || !data) {
    return <Spinner />;
  }

  const handleToggleNewTriggerModal = () => {
    setIsNewTriggerModalOpen(!isNewTriggerModalOpen);
  };

  const handlePropertyInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const target = e.target as HTMLInputElement;
      const value = target.value;

      if (!createRegexExtractorPayload.properties.includes(value)) {
        setCreateRegexExtractorPayload((prev) => ({
          ...prev,
          properties: [...prev.properties, value],
        }));
        target.value = "";
      }
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTrigger((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const handleRemoveProperty = (property: string) => () => {
    setCreateRegexExtractorPayload((prev) => ({
      ...prev,
      properties: prev.properties.filter((p) => p !== property),
    }));
  };

  const handleSaveTrigger = async () => {
    try {
      await createTrigger(newTrigger);
      handleToggleNewTriggerModal();
    } catch (error) {
      console.log(error);
    }
  };

  let regex = new RegExp("/.+/");

  try {
    regex = new RegExp(String(newTrigger?.extractorRegex));
  } catch (error) {}

  const previewObject: Record<string, string> =
    String(data?.logExample).match(regex)?.groups ?? {};

  return (
    <>
      <Drawer
        isOpen={isNewTriggerModalOpen}
        placement="right"
        onClose={handleToggleNewTriggerModal}
        size="lg"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" fontWeight="normal">
            <Heading size="md" mb="2">
              Create your trigger
            </Heading>
            <Text fontSize="xs" mb="1">
              Example log
            </Text>
            <Box w="full" p="2" bg="black" rounded="md" shadow="md">
              <Text fontFamily="menlo" fontSize="sm" color="white">
                {data.logExample}
              </Text>
            </Box>
          </DrawerHeader>

          <DrawerBody pt="8">
            <Box>
              <Box mb="4">
                <Heading fontSize="sm" mb="1">
                  1. Set your event name.
                </Heading>
                <Text fontSize="xs">Set the name of the event.</Text>
              </Box>
              <Box>
                <Input
                  placeholder="e.g. New user registered"
                  size="sm"
                  value={newTrigger.title}
                  onChange={handleTitleChange}
                />
              </Box>
            </Box>
            <Divider my="10" />
            <Box>
              <Box mb="4">
                <Heading fontSize="sm" mb="1">
                  2. Add properties.
                </Heading>
                <Text fontSize="xs">
                  Insert the properties to add to your event payload. We will
                  use AI to extract them from the log.
                </Text>
              </Box>
              <UnorderedList
                fontSize="sm"
                color="white"
                mb={
                  createRegexExtractorPayload.properties.length > 0 ? "6" : "0"
                }
                spacing="2"
              >
                {createRegexExtractorPayload.properties.map((property) => (
                  <ListItem key={property}>
                    {property}
                    <Button
                      variant="link"
                      size="xs"
                      ml="2"
                      fontWeight="normal"
                      onClick={handleRemoveProperty(property)}
                    >
                      (Remove)
                    </Button>
                  </ListItem>
                ))}
              </UnorderedList>
              <Box>
                <Input
                  placeholder="Property name"
                  size="sm"
                  onKeyUp={handlePropertyInput}
                />
                <Text fontSize="2xs" mt="1" color="gray.500">
                  (Press Enter to add)
                </Text>
              </Box>
            </Box>
            <Divider my="10" />
            <Box>
              <Box mb="4">
                <Heading fontSize="sm" mb="1">
                  3. Generate preview with AI and verify result.
                </Heading>
                <Text fontSize="xs">
                  Click &quot;generate&quot; to see the event payload and make
                  sure it matches the properties of the example log.
                </Text>
              </Box>
              <Text fontSize="xs" mb="1">
                Preview
              </Text>
              <Box position="relative">
                <Box
                  as="pre"
                  w="full"
                  p="2"
                  bg="black"
                  rounded="md"
                  fontFamily="menlo"
                  fontSize="sm"
                  overflow="auto"
                >
                  {JSON.stringify(previewObject, null, 2)}
                </Box>
                <Button
                  position="absolute"
                  bottom="2"
                  right="2"
                  size="xs"
                  variant="solid"
                  onClick={() => createRegexExtractor()}
                  isLoading={isCreatingRegexExtractor}
                >
                  Generate
                </Button>
              </Box>
              <Textarea
                size="xs"
                mt="1"
                value={newTrigger?.extractorRegex}
                rows={2}
                onChange={(e) =>
                  setNewTrigger((prev) => ({
                    ...prev,
                    extractorRegex: e.target.value,
                  }))
                }
              />
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="solid"
              mr={3}
              onClick={handleToggleNewTriggerModal}
              size="sm"
            >
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              size="sm"
              isLoading={isCreatingTrigger}
              onClick={handleSaveTrigger}
              leftIcon={<Save />}
            >
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Box p="4" bg="gray.900">
        <Box mb="3">
          <Breadcrumb fontSize="sm">
            <BreadcrumbItem>
              <BreadcrumbLink as={NextLink} href="/dashboard/queries">
                queries
              </BreadcrumbLink>
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
        <Flex justifyContent="space-between" mb="2">
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
          <Button
            size="sm"
            leftIcon={<Plus />}
            onClick={handleToggleNewTriggerModal}
          >
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
            gridTemplateColumns={GRID}
          >
            <GridItem px="3">Name</GridItem>
            <GridItem px="3">Regex</GridItem>
          </Grid>

          {data.triggers?.map((trigger) => (
            <Card key={trigger.id} w="full" shadow="sm" transition="all 0.2s">
              <Grid
                display="inline-grid"
                cursor="pointer"
                gridTemplateColumns={GRID}
                py="2"
              >
                <GridItem px="3" display="flex" alignItems="center">
                  {trigger.title}
                </GridItem>
                <GridItem
                  px="3"
                  display="flex"
                  alignItems="center"
                  fontFamily="menlo"
                  fontSize="xs"
                >
                  <Text noOfLines={1}>{trigger.extractorRegex}</Text>
                </GridItem>
              </Grid>
            </Card>
          ))}
        </VStack>
      </Box>
    </>
  );
};

export default Page;
