"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Icon,
  IconButton,
  Input,
  Divider,
} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { User } from "@/types";
import { useAuth } from "@/context/authentication";
import { EditIcon } from "@chakra-ui/icons";

export default function UserInfo(props: { user: User }) {
  const [isEditing, setIsEditing] = useState(false);
  const { changeUserInfo } = useAuth();
  const { user } = props;
  const [newUserInfo, setNewUserInfo] = useState<User>({ ...user });

  const handleInputChange = (field: keyof User, value: string | number) => {
    setNewUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (!isEditing) {
      changeUserInfo(newUserInfo.first_name, newUserInfo.last_name);
    }
  }, [isEditing]);

  return (
    <Box w="80%" mt="2rem" p="2rem" textAlign="center">
      <Flex alignItems="center" gap="2rem">
        <Icon color="black.500" w="3rem" p="0.5rem" h="3rem" as={FaUser} />
        <Heading fontSize="2xl" as="b">
          Meu perfil
        </Heading>
      </Flex>
      <Flex
        // bg="gray.100"
        borderColor="gray.200"
        borderWidth="1px"
        borderRadius="2rem"
        width="100%"
        bg={isEditing ? "gray.100" : "white"}
        p="2rem"
        flexDir="column"
        rowGap={4}
        mt="2rem"
      >
        <Flex h="40px" gap="0.5rem" alignItems="center">
          <Text w="120px" as="b" textAlign="left" verticalAlign="middle">
            Nome:
          </Text>
          {isEditing ? (
            <Input
              value={newUserInfo.first_name}
              onChange={(e) => handleInputChange("first_name", e.target.value)}
              w="calc(100% - 120px)"
              px="0.5rem"
            />
          ) : (
            <Text px="0.5rem" w="calc(100% - 120px)" textAlign="left">
              {user.first_name}
            </Text>
          )}
        </Flex>
        <Divider />
        <Flex h="40px" gap="0.5rem" alignItems="center">
          <Text w="120px" textAlign="left" as="b">
            Sobrenome:
          </Text>
          {isEditing ? (
            <Input
              w="calc(100% - 120px)"
              value={newUserInfo.last_name}
              onChange={(e) => handleInputChange("last_name", e.target.value)}
              px="0.5rem"
            />
          ) : (
            <Text px="0.5rem" w="calc(100% - 120px)" textAlign="left">
              {user.last_name}
            </Text>
          )}
        </Flex>
        <Divider />
        <Flex h="40px" gap="0.5rem" alignItems="center">
          <Text w="120px" textAlign="left" as="b">
            Email:
          </Text>
          <Text px="0.5rem" w="calc(100% - 120px)" textAlign="left">
            {user.email}
          </Text>
        </Flex>
        <Box textAlign="right">
          <IconButton
            aria-label="Editar"
            colorScheme="brand"
            rounded="full"
            onClick={() => setIsEditing(!isEditing)}
            icon={<EditIcon />}
          >
            {isEditing ? "Salvar" : "Alterar"}
          </IconButton>
        </Box>
      </Flex>
    </Box>
  );
}
