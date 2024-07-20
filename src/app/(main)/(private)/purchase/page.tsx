"use client";
import { Suspense } from "react";
import { Box, Flex, Text, Heading, Button } from "@chakra-ui/react";

export default function Purchase() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Box>
        <Heading> Minhas compras </Heading>
      </Box>
    </Suspense>
  );
}
