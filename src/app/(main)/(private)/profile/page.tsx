"use client";
import { useState, Suspense } from "react";
import Orders from "@/components/Order/Orders";
import {
  Box,
  Heading,
  Flex,
  Divider,
  Text,
  Button,
  Icon,
} from "@chakra-ui/react";
import UserInfo from "@/components/UserInfo";
import { useAuth } from "@/context/authentication";
import { User } from "@/types";
import { MdAccountCircle } from "react-icons/md";
import { FaBoxArchive } from "react-icons/fa6";

export default function Profile() {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Flex minH="calc(100vh - 145px)">
        <Flex
          minHeight="calc(100vh - 145px)"
          bg="white"
          m="2rem"
          p="2rem"
          borderRadius="2rem"
        >
          <Flex rowGap={4} mt="2rem" flexDir="column">
            <Button
              colorScheme={selectedTab === 0 ? "brand" : "gray"}
              variant="ghost"
              py="1rem"
              justifyContent="flex-start"
              width="200px"
              onClick={() => setSelectedTab(0)}
              leftIcon={
                <Icon
                  color={selectedTab === 0 ? "brand.500" : "black.100"}
                  h="24px"
                  w="24px"
                  as={MdAccountCircle}
                />
              }
            >
              Suas informações
            </Button>
            <Divider />
            <Button
              colorScheme={selectedTab === 1 ? "brand" : "gray"}
              variant="ghost"
              py="1rem"
              justifyContent="flex-start"
              onClick={() => setSelectedTab(1)}
              width="200px"
              leftIcon={
                <Icon
                  color={selectedTab === 1 ? "brand.500" : "black.100"}
                  h="20px"
                  w="20px"
                  ml="2px"
                  as={FaBoxArchive}
                />
              }
            >
              Pedidos
            </Button>
          </Flex>
        </Flex>
        <Box
          minHeight="100%"
          bg="white"
          m="2rem"
          p="2rem"
          flexGrow="1"
          borderRadius="2rem"
        >
          {selectedTab === 0 ? <UserInfo user={user as User} /> : <Orders />}
        </Box>
      </Flex>
    </Suspense>
  );
}
