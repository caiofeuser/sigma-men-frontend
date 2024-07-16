"use client";
import { useEffect, Suspense, useLayoutEffect } from "react";
import {
  Box,
  Heading,
  Flex,
  Input,
  Button,
  InputGroup,
  IconButton,
  InputRightElement,
  CircularProgress,
} from "@chakra-ui/react";
import { useAuth } from "@/context/authentication";
import { useSearchParams } from "next/navigation";

export default function Google() {
  const { googleLoginUser } = useAuth();
  const searchParams = useSearchParams();

  useLayoutEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    window.sessionStorage.setItem("state", JSON.stringify(state));

    if (code && state) {
      googleLoginUser(code, state);
    }
  }, [searchParams]);

  return (
    // <Suspense fallback={<div>Carregando...</div>}>
    <Flex justifyContent="center">
      <Box
        bg="white"
        padding="4rem"
        maxW="40rem"
        minW="35rem"
        borderRadius="2rem"
        mt="2rem"
      >
        <Box mb="2rem">
          <Heading mb="1rem" textAlign="center" fontSize="3xl">
            Agurade um momento
          </Heading>
        </Box>
        <Flex justifyContent="center" alignItems="center">
          <CircularProgress isIndeterminate color="brand.500" />
        </Flex>
      </Box>
    </Flex>
    // </Suspense>
  );
}
