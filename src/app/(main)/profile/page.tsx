"use client";
import Orders from "@/components/Order/Orders";
import { Box, Heading, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import UserInfo from "@/components/UserInfo";

export default function Profile() {
  const user = "Caio";
  const handleSaudation = () => {
    const dateHours = new Date().getHours();
    if (dateHours >= 4 && dateHours < 12) {
      return `Bom dia, ${user}!`;
    } else if (dateHours >= 12 && dateHours < 18) {
      return `Boa tarde, ${user}!`;
    } else {
      return `Boa noite, ${user}!`;
    }
  };
  return (
    <Flex justifyContent="center">
      <Box bg="white" m="2rem" p="2rem" w="100%" borderRadius="2rem">
        <Heading>{handleSaudation()}</Heading>
        <Flex>
          <Orders />
          <UserInfo />
        </Flex>
      </Box>
    </Flex>
  );
}
