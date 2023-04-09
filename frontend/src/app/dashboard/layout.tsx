"use client";

import { ReactNode, FC } from "react";
import {
  Grid,
  GridItem,
  List,
  ListItem,
  Link,
  Icon,
  Box,
  VStack,
  HStack,
  Flex,
  UnorderedList,
} from "@/modules/ui";
import NextLink from "next/link";
import { CodePlus, TimelineEventPlus } from "@/modules/ui/icons";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <Grid
      templateAreas={`"header header" "sidebar main"`}
      gridTemplateRows={"100px 1fr"}
      gridTemplateColumns={"200px 1fr"}
      h="100vh"
      w="100vw"
      bg="white"
      overflow="hidden"
    >
      <GridItem
        pl="2"
        area={"header"}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        py="4"
        px="8"
        borderBottomWidth="1px"
      >
        <Flex>
          <Box>logo</Box>
          <List as={Flex}>
            <ListItem py="3" px="2">
              <Link as={NextLink} href="/dashboard/queries" px="5">
                Queries
              </Link>
            </ListItem>
            <ListItem py="3" px="2">
              <Link as={NextLink} href="/dashboard/triggers" px="5">
                Triggers
              </Link>
            </ListItem>
          </List>
        </Flex>
      </GridItem>
      <GridItem
        pl="2"
        area={"sidebar"}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexDirection="column"
        py="3"
        borderRightWidth="1px"
      >
        <List>
          <ListItem py="3" px="2">
            <Link as={NextLink} href="/dashboard/queries" px="5">
              Queries
            </Link>
          </ListItem>
          <ListItem py="3" px="2">
            <Link as={NextLink} href="/dashboard/triggers" px="5">
              Triggers
            </Link>
          </ListItem>
        </List>
      </GridItem>
      <GridItem area={"main"} overflowY="scroll">
        {children}
      </GridItem>
    </Grid>
  );
};

export default Layout;
