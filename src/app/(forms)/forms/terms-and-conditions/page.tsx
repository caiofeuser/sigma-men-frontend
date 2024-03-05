"use client";

import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import Head from "next/head";

export default function TermsAndConditions() {
  const listStyle = {
    marginTop: "1rem",
  };
  return (
    <Flex flexDir="column" h="100%" alignItems="center">
      <Flex
        flexDir="column"
        bg="white"
        borderRadius="2rem"
        minW="600px"
        height="55%"
        w="80%"
        p="4rem"
        my="4rem"
      >
        {/* progress bar */}
        <Heading textAlign="center">Termos & condições</Heading>
        <Flex justifyContent="center" alignItems="center" m="4rem">
          <ul
            style={{
              color: "var(--chakra-colors-brand-500)",
            }}
          >
            <li style={listStyle}>
              <span style={{ color: "black" }}>
                Sou homem, tenho entre 18 e 65 anos e moro no Brasil;
              </span>
            </li>
            <li style={listStyle}>
              <span style={{ color: "black" }}>
                Serei o único a consumir qualquer medicamento recomendado por
                este serviço;
              </span>
            </li>
            <li style={listStyle}>
              <span style={{ color: "black" }}>
                Confirmo que todas as informações que disponibilizarei são
                minhas e estou sendo honesto.
              </span>
            </li>
            <li style={listStyle}>
              <span style={{ color: "black" }}>
                Li e concordo com a Política de dados pessoais, Termos e
                condições de uso e Termo de Consentimento para Telessaúde e
                estou ciente de que meus dados pessoais serão coletados e
                tratados pela MANUAL nos termos dessas políticas.
              </span>
            </li>
          </ul>
        </Flex>
        <Flex justifyContent="center" gap="4rem">
          <Button
            borderRadius="2rem"
            variant="solid"
            minW="200px"
            colorScheme="brand"
          >
            Eu aceito
          </Button>
          <Button borderRadius="2rem" minW="200px">
            Não aceito
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
