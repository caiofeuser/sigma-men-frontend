"use client";
import { useState, useContext, Suspense } from "react";
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
  AbsoluteCenter,
  Divider,
} from "@chakra-ui/react";
import { RiLoginCircleFill } from "react-icons/ri";
import { Icon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import AuthContext from "@/context/authentication";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

export default function Login() {
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  //@ts-ignore
  const { loginUser, getUrlGoogle } = useContext(AuthContext);

  const handleSubmit = () => {
    console.log({
      email,
      password,
    });
    loginUser(email, password);
  };

  const handleGoogleLogin = () => {
    getUrlGoogle().then((data: { authorization_url: string }) => {
      const { authorization_url } = data;
      window.location.replace(authorization_url);
      console.log(data);
    });
  };

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
            <Heading mb="2rem" textAlign="center" fontSize="2xl">
              Entre em sua conta
            </Heading>
          </Box>
          <Box>
            <Box>
              <Button
                onClick={() => handleGoogleLogin()}
                colorScheme="google"
                rounded="full"
                w="100%"
                fontWeight="600"
                h="3rem"
                mb="1rem"
                leftIcon={<Icon size="1.25rem" as={FcGoogle} />}
                textColor="black"
                border="1px solid #d2d2d2"
              >
                Entrar com Google
              </Button>
            </Box>
            <Box>
              <Button
                onClick={() => handleGoogleLogin()}
                colorScheme="facebook"
                rounded="full"
                w="100%"
                fontWeight="600"
                h="3rem"
                mb="1rem"
                leftIcon={
                  <Icon color="white" size="1.25rem" as={FaFacebookF} />
                }
              >
                Entre com Facebook
              </Button>
            </Box>
            <Box position="relative" padding="10">
              <Divider />
              <AbsoluteCenter bg="white" px="4">
                ou
              </AbsoluteCenter>
            </Box>
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
                onClick={() => router.push("/password-reset")}
              >
                Esqueceu sua senha?
              </Link>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Suspense>
  );
}
