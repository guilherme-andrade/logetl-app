"use client";

import { ReactNode, FC } from "react";
import { Grid, GridItem } from "@/modules/ui";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <Grid
      templateAreas={`"nav header" "nav main" "nav main"`}
      gridTemplateRows={"50px 1fr 30px"}
      gridTemplateColumns={"70px 1fr"}
      h="100vh"
      w="100vw"
      bg="white"
    >
      <GridItem
        pl="2"
        area={"header"}
        borderBottomWidth="1px"
        borderColor="gray.100"
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
        borderRightWidth="1px"
        borderColor="gray.100"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexDirection="column"
        px="4"
        py="3"
      >
        Nav
      </GridItem>
      <GridItem pl="2" area={"main"} p="8" pt="16">
        {children}
      </GridItem>
    </Grid>
  );
};

export default Layout;
