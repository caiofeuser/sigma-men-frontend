"use client";
import { useState, Suspense } from "react";
import {
  Box,
  Heading,
  Flex,
  Text,
  List,
  ListItem,
  ListIcon,
  Icon,
  Input,
  FormControl,
} from "@chakra-ui/react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Flex justifyContent="center">
        <Box
          bg="white"
          padding="4rem"
          minW="35rem"
          borderRadius="2rem"
          mt="2rem"
        >
          <Box mb="2rem">
            <Heading mb="1rem" textAlign="center" fontSize="3xl">
              Recupere sua senha
            </Heading>
            <Text color="gray.500">
              Não se preocupe, ajuderemos você a recuperar sua senha
            </Text>
          </Box>
          <Box>
            <Input
              mb="2rem"
              focusBorderColor="brand.500"
              colorScheme="brand"
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              h="3rem"
            />
            <Input
              mb="2rem"
              focusBorderColor="brand.500"
              colorScheme="brand"
              type="email"
              id="email"
              placeholder="Código de confirmação"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
              h="3rem"
            />
          </Box>
        </Box>
      </Flex>
    </Suspense>
  );
}
