"use client";
import { useState, Suspense } from "react";
import {
  Box,
  Heading,
  Flex,
  Text,
  Input,
  Button,
  Toast,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "@/context/authentication";
import axios from "axios";
// import useAxios from "@/api/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { resetPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = () => {
    resetPassword(email).then((r) => {
      if (r.status === 204) {
        setIsLoading(false);
        toast({
          title: "Email enviado com sucesso",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Erro ao enviar email",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    });
  };

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Flex justifyContent="center">
        <Flex
          bg="white"
          padding="4rem"
          minW="35rem"
          borderRadius="2rem"
          mt="2rem"
          flexDir="column"
          justifyContent="center"
          textAlign="center"
        >
          <Box mb="2rem">
            <Heading mb="1rem" textAlign="center" fontSize="3xl">
              Recupere sua senha
            </Heading>
            <Text color="gray.500">
              Não se preocupe, ajuderemos você a recuperar sua senha
            </Text>
          </Box>
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
          <Button
            isLoading={isLoading}
            colorScheme="brand"
            rounded="full"
            fontWeight="600"
            h="3rem"
            mb="1rem"
            width="min-content"
            alignSelf="center"
            onClick={handleSubmit}
          >
            Enviar código de recuperação
          </Button>
        </Flex>
      </Flex>
    </Suspense>
  );
}
