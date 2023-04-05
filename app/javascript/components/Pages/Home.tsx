import React from "react";
import app from "../../app/_app";
import {
  Box,
  Container,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  List,
  ListIcon,
  ListItem,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { TbTimelineEvent, TbHome, TbFileDescription } from "react-icons/tb";

export default app(({ name }) => {
  return (
    <Box minH="100vh">
      <Grid
        gridTemplateColumns="200px 1fr"
        gridGap="12"
        p="12"
        w="full"
        h="90vh"
      >
        <GridItem>
          <List borderRightWidth="1px">
            <ListItem px="4" py="2" display="flex" alignItems="center">
              <ListIcon as={TbHome} mr="2" />
              Home
            </ListItem>
            <ListItem px="4" py="2" display="flex" alignItems="center">
              <ListIcon as={TbTimelineEvent} mr="2" />
              Events
            </ListItem>
            <ListItem px="4" py="2" display="flex" alignItems="center">
              <ListIcon as={TbFileDescription} mr="2" />
              Logs
            </ListItem>
          </List>
        </GridItem>
        <GridItem h="full">
          <Heading
            as="h1"
            fontWeight="bold"
            fontSize="2xl"
            lineHeight="2"
            mb="4"
          >
            Hello {name}! Welcome to your dashboard.
          </Heading>
          <Box
            rounded="md"
            bg="gray.50"
            p="4"
            borderWidth="1px"
            h="full"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Text as="pre" fontSize="xs" py="4">
              loremasdasdasdas
            </Text>
            <Box pt="4" borderTopWidth="1px">
              <FormLabel fontSize="xs">Your query</FormLabel>
              <Textarea
                variant="unstyled"
                p="2"
                bg="white"
                fontSize="sm"
                placeholder="Unstyled"
                size="lg"
                rows={2}
              />
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
});
