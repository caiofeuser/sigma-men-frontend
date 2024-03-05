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
    beige: "#F7F7F7",
  },
});
export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
