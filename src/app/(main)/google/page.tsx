"use client";
import { useEffect, useState } from "react";
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

export default function Google() {
  const { googleLoginUser } = useAuth();
  const code = localStorage.getItem("googleCode")
    ? localStorage.getItem("googleCode")
    : null;

  useEffect(() => {
    if (code) {
      console.log(code);
      googleLoginUser(code);
    }
  }, [code]);

  return (
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
  );
}
