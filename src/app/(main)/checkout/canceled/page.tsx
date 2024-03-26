"use client";
import { Flex, Heading, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ArrowBackIcon } from "@chakra-ui/icons";

export default function Canceled() {
  const router = useRouter();
  return (
    <Flex
      flexDir="column"
      justifyContent="space-between"
      pt="8rem"
      h="calc(100vh - 95px)"
      pb="3rem"
    >
      <Heading textAlign="center">
        Compra
        <span style={{ color: "var(--chakra-colors-brand-500)" }}>
          {" "}
          cancelada
        </span>
      </Heading>
      <Flex justifyContent="center" mb="5rem">
        <Button
          colorScheme="brand"
          onClick={() => router.push("/")}
          rounded="full"
          size="lg"
          leftIcon={<ArrowBackIcon />}
        >
          Voltar para a página inicial
        </Button>
      </Flex>
    </Flex>
  );
}
