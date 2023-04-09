import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: "gray.100",
      },
    },
  },
  // Input: {
  //   baseStyle: {
  //     field: {
  //       borderColor: "black",
  //     },
  //   },
  // },
  // InputGroup: {
  //   baseStyle: {
  //     field: {
  //       borderColor: "black",
  //     },
  //   },
  // },
  colors: {
    black: {
      50: "#f9fafb",
      100: "#f4f5f7",
      200: "#e5e7eb",
      300: "#d2d6dc",
      400: "#9fa6b2",
      500: "#000",
      600: "#000",
      700: "#000",
      800: "#000",
      900: "#000",
    },
  },
});
