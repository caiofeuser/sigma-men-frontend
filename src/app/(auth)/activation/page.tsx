"use client";
import { Box, Flex, Text, Heading, Button } from "@chakra-ui/react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
// const key = params.get("key") || "";
import "./success.css";

export default function VerifyEmail() {
  const params = useSearchParams();
  const router = useRouter();

  const key = params.get("key") || "";

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
            <Heading mb="2rem" textAlign="center" fontSize="3xl">
              Email confirmado!
            </Heading>
            <Flex
              gap={1}
              flexDir="column"
              alignItems="center"
              justifyContent="center"
              mb={4}
            >
              <CheckIcon />
              <Button
                colorScheme="brand"
                onClick={() => router.push("/choose-username")}
              >
                Faça login
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Suspense>
  );
}
