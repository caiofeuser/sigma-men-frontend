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

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [show, setShow] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());

  const router = useRouter();

  return (
    <Flex justifyContent="center">
      <Box bg="white" padding="4rem" minW="35rem" borderRadius="2rem" mt="2rem">
        <Box>
          <Heading mb="3rem" textAlign="center" fontSize="3xl">
            Primeira vez aqui?
          </Heading>
        </Box>
        <Box>
          <Flex gap="1rem">
            <FormControl>
              <Input
                mb="2rem"
                focusBorderColor="brand.500"
                colorScheme="brand"
                type="text"
                id="name"
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
                id="lastName"
                placeholder="Sobrenome"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                h="3rem"
              />
            </FormControl>
          </Flex>
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
          <FormControl>
            <Input
              mb="2rem"
              focusBorderColor="brand.500"
              colorScheme="brand"
              type="tel"
              id="phoneNumber"
              placeholder="Telefone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              h="3rem"
            />
          </FormControl>
          <FormControl>
            <Input
              h="3rem"
              focusBorderColor="brand.500"
              colorScheme="brand"
              placeholder="dd/mm/aaaa"
              width="100%"
              mb="2rem"
            />
          </FormControl>
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
        </Box>
        <Flex justifyContent="center" mt="2rem">
          <Button
            // onClick={() => handleSubmit()}
            onClick={() => router.push("/")}
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
  );
}
