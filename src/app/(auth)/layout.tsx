"use client";
import Footer from "@/components/Footer";
import { Box } from "@chakra-ui/react";

interface FooterProps {
  children?: React.ReactNode;
}

export default function AuthLayout({ children }: FooterProps) {
  return (
    <Box style={{ minHeight: "calc(100vh - 105px)" }} bg="beige">
      {children}
    </Box>
  );
}
