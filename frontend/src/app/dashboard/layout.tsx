"use client";

import { ReactNode, FC } from "react";
import {
  Grid,
  GridItem,
  List,
  ListItem,
  Link,
  Box,
  Flex,
  Icon,
  Button,
} from "@/modules/ui";
import NextLink from "next/link";
import { ChevronDown, CodePlus, TimelineEventPlus } from "@/modules/ui/icons";
import Image from "next/image";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <Grid
      templateAreas={`"header header" "sidebar main"`}
      gridTemplateRows={"40px 1fr"}
      gridTemplateColumns={"50px 1fr"}
      h="100vh"
      w="100vw"
      overflow="hidden"
    >
      <GridItem
        area={"header"}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        borderBottomWidth="1px"
        borderColor="gray.700"
        bg="black"
      >
        <Flex alignItems="center" justifyContent="center" w="60px">
          <Image src="/logo.svg" alt="logo" width={24} height={24} />
        </Flex>

        <List as={Flex}>
          <ListItem>
            <Button
              variant="link"
              as={NextLink}
              href="/account"
              px="5"
              size="sm"
            >
              Learn
            </Button>
          </ListItem>
          <ListItem>
            <Button
              variant="link"
              as={NextLink}
              href="/account"
              px="5"
              size="sm"
            >
              Analytics
            </Button>
          </ListItem>
          <ListItem>
            <Button
              variant="link"
              as={NextLink}
              href="/account"
              px="5"
              size="sm"
            >
              Integrations
            </Button>
          </ListItem>
          <ListItem>
            <Button
              variant="link"
              as={NextLink}
              href="/account"
              px="5"
              rightIcon={<ChevronDown />}
              size="sm"
            >
              Account
            </Button>
          </ListItem>
        </List>
      </GridItem>
      <GridItem
        area={"sidebar"}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexDirection="column"
        py="3"
        borderRightWidth="1px"
        borderColor="gray.700"
        bg="gray.900"
      >
        <List>
          <ListItem py="3">
            <Link as={NextLink} href="/dashboard/queries">
              <Icon w="5" h="5" as={CodePlus} />
            </Link>
          </ListItem>
          <ListItem py="3">
            <Link as={NextLink} href="/dashboard/triggers">
              <Icon w="5" h="5" as={TimelineEventPlus} />
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
