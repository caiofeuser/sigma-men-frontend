"use client";
import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Icon,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";

export default function UserInfo() {
  const userInfo = {
    id: 1,
    name: "Caio",
    lastName: "Feuser",
    email: "caiofeuserdm@gmail.com",
    idade: 22,
  };

  return (
    <Box w="60%" mt="2rem" p="2rem" textAlign="center">
      <Flex alignItems="center" gap="2rem">
        <Icon color="black.500" w="4rem" p="0.5rem" h="4rem" as={FaUser} />
        <Heading>Meu perfil</Heading>
      </Flex>
      <Flex
        borderRadius="2rem"
        p="2rem"
        bg="brand.50"
        flexDir="column"
        rowGap={4}
        mt="2rem"
      >
        <Flex gap="0.5rem">
          <Text as="b">Nome:</Text>
          <Text>{userInfo.name}</Text>
        </Flex>
        <Flex gap="0.5rem">
          <Text as="b">Sobrenome:</Text>
          <Text>{userInfo.lastName}</Text>
        </Flex>
        <Flex gap="0.5rem">
          <Text as="b">Email:</Text>
          <Text>{userInfo.email}</Text>
        </Flex>
        <Flex gap="0.5rem">
          <Text as="b">Idade:</Text>
          <Text>{userInfo.idade}</Text>
        </Flex>
        <Box textAlign="right">
          <Button colorScheme="brand" rounded="full">
            Alterar
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
