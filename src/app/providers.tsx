"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#e4e8f8", // secondary
      100: "#d5daf9",
      200: "#c3cfff",
      300: "#a6b3ff",
      400: "#8c97ff",
      500: "#7885ff", // primary
      600: "#5162ff", // primary hover
      700: "#454cff",
      800: "#2e35ff",
      900: "#171eff",
    },
    black: {
      50: "#767676",
      100: "#666666",
      200: "#565656",
      300: "#464646",
      400: "#373737",
      500: "#222222",
      600: "#121212",
      700: "#0D0D0D",
      800: "#090909",
      900: "#040404",
    },
    beige: {
      50: "#fdfdfd",
      100: "#f7f7f7",
      200: "#f5f5f5",
      300: "#f1f1f1",
      400: "#ededed",
      500: "#e9e9e9",
      600: "#e5e5e5",
      700: "#e1e1e1",
      800: "#dddddd",
      900: "#d9d9d9",
    },
  },
});
export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
