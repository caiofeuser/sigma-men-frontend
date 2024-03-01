"use client";

import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

export default function Forms() {
  const router = useRouter();
  const currentPath = usePathname();

  const treatments = [
    {
      title: "Queda de cabelo",
      icon: <Image width="72" alt="hairLoss" height="72" src="hairLoss.svg" />,
    },
    {
      title: "Disfunção erétil",
      icon: (
        <Image width="72" alt="hairLoss" height="72" src="disfuction.svg" />
      ),
    },
    {
      title: "Sono",
      icon: <Image width="72" alt="hairLoss" height="72" src="sleep.svg" />,
    },
    {
      title: "Perda de peso",
      icon: (
        <Image width="72" alt="hairLoss" height="72" src="weightLoss.svg" />
      ),
    },
  ];
  return (
    <Flex flexDir="column" alignItems="center" bg="beige">
      <Flex
        flexDir="column"
        bg="white"
        borderRadius="2rem"
        minH="500px"
        height="55%"
        w="80%"
        p="4rem"
        mt="2rem"
      >
        <Heading textAlign="center">No que podemos ajudar?</Heading>
        <Flex justifyContent="space-evenly">
          {treatments.map((treatment) => (
            <Box mt="4rem" key={treatment.title}>
              <Button
                justifyContent="center"
                alignItems="center"
                h="180px"
                w="180px"
                borderRadius="50%"
                bg="secondary"
                onClick={() =>
                  router.push(`${currentPath}/terms-and-conditions`)
                }
                _hover={{
                  background: "secondaryHover",
                  cursor: "pointer",
                  transform: "translateY(-2px)",
                  transitionDuration: "0.2s",
                  transitionTimingFunction: "ease-in-out",
                }}
              >
                {treatment.icon}
              </Button>
              <Text mt="2rem" textAlign="center" fontSize="2xl">
                {treatment.title}
              </Text>
            </Box>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
