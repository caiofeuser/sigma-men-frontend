"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Icon,
  Button,
  IconButton,
  Input,
} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { User } from "@/types";
import { useAuth } from "@/context/authentication";

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
      changeUserInfo(
        newUserInfo.first_name,
        newUserInfo.last_name,
        newUserInfo?.age || 0
      );
    }
  }, [isEditing]);

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
          {isEditing ? (
            <Input
              value={newUserInfo.first_name}
              onChange={(e) => handleInputChange("first_name", e.target.value)}
            />
          ) : (
            <Text>{user.first_name}</Text>
          )}
        </Flex>
        <Flex gap="0.5rem">
          <Text as="b">Sobrenome:</Text>
          {isEditing ? (
            <Input
              value={newUserInfo.last_name}
              onChange={(e) => handleInputChange("last_name", e.target.value)}
            />
          ) : (
            <Text>{user.last_name}</Text>
          )}
        </Flex>
        {/* <Flex gap="0.5rem">
          <Text as="b">Idade:</Text>
          {isEditing ? (
            <Input
              type="number"
              value={newUserInfo.age}
              onChange={(e) =>
                handleInputChange("age", parseInt(e.target.value))
              }
            />
          ) : (
            <Text>{user.age}</Text>
          )}
        </Flex> */}
        <Box textAlign="right">
          <Button
            colorScheme="brand"
            rounded="full"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Salvar" : "Alterar"}
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
