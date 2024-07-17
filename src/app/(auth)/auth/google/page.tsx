"use client";
import { useEffect, Suspense, useLayoutEffect } from "react";
import { Box, Heading, Flex, CircularProgress, Button } from "@chakra-ui/react";
import { useAuth } from "@/context/authentication";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Google() {
  const {
    googleLoginUser,
    setAccessToken,
    setRefreshToken,
    getUserInfo,
    accessToken,
    refreshToken,
  } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    // Ensure code and state are available before proceeding
    if (code && state) {
      googleLoginUser(code, state)
        .then((data: { access: string; refresh: string; user: string }) => {
          const { access, refresh, user } = data;

          localStorage.setItem("access", access);
          localStorage.setItem("refresh", refresh);

          setAccessToken(access);
          setRefreshToken(refresh);

          getUserInfo(access).then(() => {
            router.push("/");
          });
        })
        .catch((error) => {
          console.error("Error during Google login:", error);
          // Handle error, e.g., show notification to user
        });
    }
  }, [searchParams]);

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
              Agurade um momento
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
