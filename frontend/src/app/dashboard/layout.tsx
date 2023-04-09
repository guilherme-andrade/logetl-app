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
} from "@/modules/ui";
import NextLink from "next/link";
import { CodePlus, TimelineEventPlus } from "@/modules/ui/icons";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <Grid
      templateAreas={`"nav header" "nav main" "nav main"`}
      gridTemplateRows={"50px 1fr 30px"}
      gridTemplateColumns={"50px 1fr"}
      h="100vh"
      w="100vw"
      bg="white"
    >
      <GridItem
        pl="2"
        area={"header"}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        py="4"
        px="8"
      >
        Header
      </GridItem>
      <GridItem
        pl="2"
        area={"nav"}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexDirection="column"
        py="3"
        color="white"
        bg="black"
      >
        <VStack>
          <Box>logo</Box>
          <List as="nav">
            <ListItem py="3" px="2">
              <Link as={NextLink} href="/dashboard/queries">
                <Icon as={CodePlus} />
              </Link>
            </ListItem>
            <ListItem py="3" px="2">
              <Link as={NextLink} href="/dashboard/queries">
                <Icon as={TimelineEventPlus} />
              </Link>
            </ListItem>
          </List>
        </VStack>
      </GridItem>
      <GridItem pl="2" area={"main"} p="8" pt="16">
        {children}
      </GridItem>
    </Grid>
  );
};

export default Layout;
