"use client";
import { useState, useContext, useEffect } from "react";
import { Box, Flex, Text, Heading } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/authentication";
import "./success.css";

export default function VerifyEmail() {
  const params = useSearchParams();

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
    <Flex justifyContent="center">
      <Box bg="white" padding="4rem" minW="35rem" borderRadius="2rem" mt="2rem">
        <Flex
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          gap={5}
        >
          <Heading mb="2rem" textAlign="center" fontSize="3xl">
            Enviamos uma e-mail para você!
          </Heading>
          <Flex
            gap={1}
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            mb={4}
          >
            <Text fontSize="md">
              Clique no link que foi enviado para confirmar seu e-mail.
            </Text>
            <Text fontSize="sm" color="black.100">
              Caso demore mais do que o esperado, entre em contato com nosso
              suporte.
            </Text>
          </Flex>
          <CheckIcon />
        </Flex>
      </Box>
    </Flex>
  );
}
