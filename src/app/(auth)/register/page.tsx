"use client";
import { useState, Suspense } from "react";
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

export default function Register() {
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [showPassword1, setShowPassword1] = useState<Boolean>(false);
  const [showPassword2, setShowPassword2] = useState<Boolean>(false);
  const { registerUser } = useAuth();

  const router = useRouter();

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
          <Box>
            <Heading mb="3rem" textAlign="center" fontSize="3xl">
              Primeira vez aqui?
            </Heading>
          </Box>
          <Box>
            <FormControl>
              <Input
                mb="2rem"
                focusBorderColor="brand.500"
                colorScheme="brand"
                type="text"
                id="first_name"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                h="3rem"
              />
            </FormControl>
            <FormControl>
              <Input
                mb="2rem"
                focusBorderColor="brand.500"
                colorScheme="brand"
                type="text"
                id="last_name"
                placeholder="Sobrenome"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                h="3rem"
              />
            </FormControl>
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
            <InputGroup mb="2rem">
              <Input
                h="3rem"
                colorScheme="brand"
                type={showPassword1 ? "text" : "password"}
                id="password1"
                focusBorderColor="brand.500"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement display="flex" alignItems="center" h="3rem">
                <IconButton
                  aria-label="Mostrar senha"
                  onClick={() => setShowPassword1(!showPassword1)}
                  icon={showPassword1 ? <ViewOffIcon /> : <ViewIcon />}
                  colorScheme="brand"
                  size="sm"
                  variant="ghost"
                  rounded="full"
                  alignContent="center"
                />
              </InputRightElement>
            </InputGroup>
            <InputGroup>
              <Input
                h="3rem"
                colorScheme="brand"
                type={showPassword2 ? "text" : "password"}
                id="password2"
                focusBorderColor="brand.500"
                placeholder="Confirme sua senha"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
              />
              <InputRightElement display="flex" alignItems="center" h="3rem">
                <IconButton
                  aria-label="Mostrar senha"
                  onClick={() => setShowPassword2(!showPassword2)}
                  icon={showPassword2 ? <ViewOffIcon /> : <ViewIcon />}
                  colorScheme="brand"
                  size="sm"
                  variant="ghost"
                  rounded="full"
                  alignContent="center"
                />
              </InputRightElement>
            </InputGroup>
          </Box>
          <Flex justifyContent="center" mt="2rem">
            <Button
              onClick={() =>
                registerUser(name, lastName, email, password, rePassword)
              }
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
            <Link color="brand.500" onClick={() => router.push("/login")}>
              Já tem uma conta? Faça login
            </Link>
          </Box>
        </Box>
      </Flex>
    </Suspense>
  );
}
