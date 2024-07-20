"use client";
import { Box, Flex, Text, Heading, Button } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useAuth } from "@/context/authentication";
import "../../success.css";

export default function VerifyEmail() {
  const params = useParams<{ uid: string; token: string }>();
  const router = useRouter();
  const { activation } = useAuth();
  const [status, setStatus] = useState({ success: false, message: "" });

  useEffect(() => {
    const activateAccount = async () => {
      const { uid, token } = params;
      const response = await activation(uid, token);
      //@ts-ignore
      if (response?.status === 204) {
        setStatus({ success: true, message: "Email confirmado!" });
      } else {
        setStatus({
          success: false,
          message: "Falha na confirmação do email. Por favor, tente novamente.",
        });
      }
    };
    activateAccount();
  }, [params, activation]);

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
              {status.success ? "Email confirmado!" : "Erro de Confirmação"}
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
          </Flex>
        </Box>
      </Flex>
    </Suspense>
  );
}
