"use client";
import { useEffect, Suspense, useState } from "react";
import {
  Box,
  Heading,
  Flex,
  CircularProgress,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "@/context/authentication";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Google() {
  const { googleLoginUser, setAccessToken, setRefreshToken, getUserInfo } =
    useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const toast = useToast();
  const [toastIsShowed, setToastIsShowed] = useState(false);
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  useEffect(() => {
    if (code && state) {
      googleLoginUser(code, state)
        .then((data: { access: string; refresh: string; user: string }) => {
          const { access, refresh } = data;

          localStorage.setItem("access", access);
          localStorage.setItem("refresh", refresh);

          setAccessToken(access);
          setRefreshToken(refresh);

          getUserInfo(access).then(() => {
            if (!toastIsShowed) {
              toast({
                title: "Login Successful",
                description: "You have been logged in successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
              });
            }
            setToastIsShowed(true);
            router.push("/");
          });
        })
        .catch((error) => {
          console.error("Error during Google login:", error);
          toast({
            title: "Login Failed",
            description: error.message || "An error occurred during login.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    }
  }, []);

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Flex justifyContent="center">
        <Box
          bg="white"
          padding="4rem"
          maxW="40rem"
          minW="35rem"
          borderRadius="2rem"
          mt="2rem"
        >
          <Box mb="2rem">
            <Heading mb="1rem" textAlign="center" fontSize="3xl">
              Aguarde um momento
            </Heading>
          </Box>
          <Flex justifyContent="center" alignItems="center">
            <CircularProgress isIndeterminate color="brand.500" />
          </Flex>
        </Box>
      </Flex>
    </Suspense>
  );
}
