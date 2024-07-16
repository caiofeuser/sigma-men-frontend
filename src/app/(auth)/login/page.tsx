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
  useEditable,
} from "@chakra-ui/react";
import { RiLoginCircleFill } from "react-icons/ri";
import { Icon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import AuthContext from "@/context/authentication";

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
    router.push("/");
  };

  const handleGoogleLogin = () => {
    //@ts-ignore
    getUrlGoogle().then((data: { authorization_url: string }) => {
      const { authorization_url } = data;
      // window.location.href = authorization_url;
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
            <Heading mb="3rem" textAlign="center" fontSize="3xl">
              Entre em sua conta
            </Heading>
          </Box>
          <Box>
            <Box>
              <Button
                onClick={() => handleGoogleLogin()}
                colorScheme="black"
                rounded="full"
                w="100%"
                fontWeight="600"
                fontSize="1.25rem"
                h="3rem"
                mb="1rem"
              >
                Entrar com Google
                <Icon
                  as={RiLoginCircleFill}
                  size="1.25rem"
                  color="var(--chakra-colors-brand-500)"
                  style={{
                    position: "absolute",
                    right: "1rem",
                  }}
                />
              </Button>
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
                onClick={() => router.push("/forgot-password")}
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
