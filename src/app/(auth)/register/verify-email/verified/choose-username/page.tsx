"use client";
import { useState } from "react";
import {
  Box,
  Flex,
  Button,
  Heading,
  Input,
  FormControl,
  Link,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { RiLoginCircleFill } from "react-icons/ri";
import { Icon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authentication";

export default function ChooseUsername() {
  const [first_name, setFirst_name] = useState<string>("");
  const [last_name, setLast_name] = useState<string>("");
  const { changeUserInfo } = useAuth();

  const router = useRouter();

  return (
    <Flex justifyContent="center">
      <Box bg="white" padding="4rem" minW="35rem" borderRadius="2rem" mt="2rem">
        <Box>
          <Heading mb="3rem" textAlign="center" fontSize="3xl">
            Complete seus dados
          </Heading>
        </Box>
        <Box>
          <FormControl>
            <Input
              mb="2rem"
              focusBorderColor="brand.500"
              colorScheme="brand"
              type="email"
              id="email"
              placeholder="Email"
              value={first_name}
              onChange={(e) => setFirst_name(e.target.value)}
              h="3rem"
            />
          </FormControl>
        </Box>
        <Flex justifyContent="center" mt="2rem">
          <Button
            onClick={() => changeUserInfo(first_name, last_name)}
            colorScheme="black"
            rounded="full"
            w="50%"
            fontWeight="600"
            fontSize="1.25rem"
            h="3rem"
          >
            Cadastrar
            <RiLoginCircleFill
              size="1.25rem"
              color="var(--chakra-colors-brand-500)"
              style={{
                position: "absolute",
                right: "1rem",
              }}
            />
          </Button>
        </Flex>
        <Box mt="2rem" textAlign="center">
          <Link color="brand.500" onClick={() => router.push("/")}>
            Já tem uma conta? Faça login
          </Link>
        </Box>
      </Box>
    </Flex>
  );
}
