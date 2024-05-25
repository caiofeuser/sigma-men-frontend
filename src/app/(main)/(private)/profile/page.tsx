"use client";
import Orders from "@/components/Order/Orders";
import { Box, Heading, Flex } from "@chakra-ui/react";
import UserInfo from "@/components/UserInfo";
import { useAuth } from "@/context/authentication";
import { User } from "@/types";

export default function Profile() {
  const { user } = useAuth();

  const handleSaudation = () => {
    const dateHours = new Date().getHours();
    if (dateHours >= 4 && dateHours < 12) {
      return `Bom dia, ${user?.first_name}!`;
    } else if (dateHours >= 12 && dateHours < 18) {
      return `Boa tarde, ${user?.first_name}!`;
    } else {
      return `Boa noite, ${user?.first_name}!`;
    }
  };

  return (
    <Flex justifyContent="center">
      <Box bg="white" m="2rem" p="2rem" w="100%" borderRadius="2rem">
        <Heading>{handleSaudation()}</Heading>
        <Flex>
          <Orders />
          <UserInfo user={user as User} />
        </Flex>
      </Box>
    </Flex>
  );
}
