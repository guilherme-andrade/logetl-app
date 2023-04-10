import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: "gray.800",
        color: "gray.400",
      },
      "*": {
        borderColor: "gray.700",
      },
      strong: {
        color: "white",
      },
    },
  },
  components: {
    Heading: {
      baseStyle: {
        color: "white",
      },
    },
    Button: {
      defaultProps: {
        variant: "outline",
      },
      variants: {
        link: {
          fontWeight: "normal",
          color: "gray.400",
        },
        outline: {
          color: "white",
          _hover: {
            bg: "white",
            color: "gray.900",
          },
          _disabled: {
            borderColor: "gray.700",
          },
        },
      },
    },
    FormLabel: {
      baseStyle: {
        fontWeight: "normal",
      },
    },
    Input: {
      baseStyle: {
        _focus: {
          boxShadow: "none",
          outline: "none",
        },
      },
      sizes: {
        sm: {
          field: {
            borderRadius: "md",
          },
        },
      },
      variants: {
        outline: {
          field: {
            borderColor: "gray.700",
            color: "white",
            _hover: {
              bg: "gray.700",
            },
            _focus: {
              bg: "gray.700",
              borderColor: "white",
              boxShadow: "none",
              outline: "none",
            },
          },
        },
      },
    },
    Textarea: {
      baseStyle: {
        _focus: {
          boxShadow: "none",
          borderColor: "white",
          outline: "none",
        },
      },
      sizes: {
        sm: {
          borderRadius: "md",
        },
      },
      variants: {
        outline: {
          borderColor: "gray.700",
          color: "white",
          _hover: {
            bg: "gray.700",
          },
          _focus: {
            bg: "gray.700",
            borderColor: "white",
            boxShadow: "none",
            outline: "none",
          },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          bg: "gray.800",
          color: "gray.400",
          borderColor: "gray.600",
          borderWidth: "2px",
          _hover: {
            borderColor: "white",
            color: "white",
            bg: "gray.600",
            boxShadow: "lg",
          },
        },
      },
    },
  },

  // InputGroup: {
  //   baseStyle: {
  //     field: {
  //       borderColor: "black",
  //     },
  //   },
  // },
  colors: {
    borderColor: "gray.800",
    gray: {
      50: "#f9fafb",
      100: "#f4f5f7",
      200: "#e5e7eb",
      300: "#d2d6dc",
      400: "#8E8D8D",
      500: "#505050",
      600: "#222222",
      700: "#171717",
      800: "#121212",
      900: "#0F0F0F",
    },
    black: "#080808",
  },
});
