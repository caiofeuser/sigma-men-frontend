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

export default function Login() {
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    console.log({
      email,
      password,
    });
    router.push("/");
  };
  return (
    <Flex justifyContent="center">
      <Box bg="white" padding="4rem" minW="35rem" borderRadius="2rem" mt="2rem">
        <Box>
          <Heading mb="3rem" textAlign="center" fontSize="3xl">
            Entre em sua conta
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              h="3rem"
            />
          </FormControl>
          <FormControl mb="2rem">
            <InputGroup>
              <Input
                h="3rem"
                colorScheme="brand"
                type={show ? "text" : "password"}
                id="password"
                focusBorderColor="brand.500"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement display="flex" alignItems="center" h="3rem">
                <IconButton
                  aria-label="Mostrar senha"
                  onClick={() => setShow(!show)}
                  icon={show ? <ViewOffIcon /> : <ViewIcon />}
                  colorScheme="brand"
                  size="sm"
                  variant="ghost"
                  rounded="full"
                  alignContent="center"
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Flex justifyContent="center">
            <Button
              onClick={() => handleSubmit()}
              colorScheme="black"
              rounded="full"
              w="50%"
              fontWeight="600"
              fontSize="1.25rem"
              h="3rem"
            >
              Entrar
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
            <Link color="brand.500" onClick={() => router.push("/register")}>
              Não tem uma conta? Registre-se!
            </Link>
          </Box>
          <Box mt="0.5rem" textAlign="center">
            <Link
              color="brand.500"
              onClick={() => router.push("/forgot-password")}
            >
              Esqueceu sua senha?
            </Link>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}
