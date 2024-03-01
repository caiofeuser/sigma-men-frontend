"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: "#7885ff",
    primaryHover: "#5162ff",
    secondary: "#E4E8F8",
    secondaryHover: "#c3cfff",
    black: "#222222",
    beige: "#F7F7F7",
  },
});
export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
