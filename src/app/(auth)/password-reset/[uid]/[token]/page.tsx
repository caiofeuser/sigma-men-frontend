"use client";
import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useAuth } from "@/context/authentication";
import "../../../register/verify-email/success.css";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function ResetPasswordConfirmation() {
  const params = useParams<{ uid: string; token: string }>();
  const router = useRouter();
  const { passwordRessetConfirmation } = useAuth();
  const [status, setStatus] = useState({ success: false, message: "" });
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isSended, setIsSended] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const toast = useToast();

  const activateAccount = async () => {
    const { uid, token } = params;
    const response = await passwordRessetConfirmation(
      uid,
      token,
      password,
      rePassword
    );
    //@ts-ignore
    if (response?.status === 204) {
      setStatus({ success: true, message: "Senha atualizada" });
      toast({
        title: "Senha atualizada",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      setStatus({
        success: false,
        message: "Falha na alteração de senha. Por favor, tente novamente.",
      });
      toast({
        title: "Erro ao atualizar senha",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const CheckIcon = () => {
    return (
      <div className="success-checkmark">
        <div className="check-icon">
          <span className="icon-line line-tip"></span>
          <span className="icon-line line-long"></span>
          <div className="icon-circle"></div>
          <div className="icon-fix"></div>
        </div>
      </div>
    );
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
          <Flex
            flexDir="column"
            justifyContent="center"
            alignItems="center"
            gap={5}
          >
            {isSended ? (
              <>
                <Heading mb="2rem" textAlign="center" fontSize="3xl">
                  {status.success ? "Senha atualizada" : "Erro de Confirmação"}
                </Heading>
                <Flex
                  gap={1}
                  flexDir="column"
                  alignItems="center"
                  justifyContent="center"
                  mb={4}
                >
                  {status.success ? <CheckIcon /> : null}
                  <Text>{status.message}</Text>
                  {status.success && (
                    <Button
                      colorScheme="brand"
                      onClick={() => router.push("/login")}
                    >
                      Faça login
                    </Button>
                  )}
                </Flex>
              </>
            ) : (
              <>
                <Heading mb="2rem" textAlign="center" fontSize="xl">
                  Insira sua nova senha e confirme para continuar
                </Heading>
                <Flex
                  flexDir="column"
                  gap={4}
                  alignItems="center"
                  justifyContent="center"
                  width="100%"
                >
                  <InputGroup width="100%">
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
                    <InputRightElement
                      display="flex"
                      alignItems="center"
                      h="3rem"
                    >
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
                  <InputGroup width="100%">
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
                    <InputRightElement
                      display="flex"
                      alignItems="center"
                      h="3rem"
                    >
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

                  <Button
                    onClick={() => {
                      activateAccount();
                      setIsSended(true);
                    }}
                    colorScheme="brand"
                    mt="2rem"
                    rounded="full"
                    w="100%"
                    fontWeight="600"
                    fontSize="1.25rem"
                    h="3rem"
                  >
                    Atualizar senha
                  </Button>
                </Flex>
              </>
            )}
          </Flex>
        </Box>
      </Flex>
    </Suspense>
  );
}
