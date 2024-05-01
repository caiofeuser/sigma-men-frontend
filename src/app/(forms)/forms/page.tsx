"use client";

import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import useAxios from "@/api/api";
import { useFormsIndex, FormsIndexContextType } from "@/context/forms";

export default function Forms() {
  const router = useRouter();
  const currentPath = usePathname();
  const { getSurveys } = useAxios();
  const { setSurvey } = useFormsIndex() as FormsIndexContextType;

  const treatments = [
    {
      name: "Queda de cabelo",
      icon: <Image width="72" alt="hairLoss" height="72" src="hairLoss.svg" />,
      id: 1,
      path: "queda-de-cabelo",
    },
    {
      name: "Disfunção erétil",
      icon: (
        <Image width="72" alt="hairLoss" height="72" src="disfuction.svg" />
      ),
      id: 2,
      path: "disfuncao-eretil",
    },
    {
      name: "Sono",
      icon: <Image width="72" alt="hairLoss" height="72" src="sleep.svg" />,
      id: 3,
      path: "sono",
    },
    {
      name: "Perda de peso",
      icon: (
        <Image width="72" alt="hairLoss" height="72" src="weightLoss.svg" />
      ),
      id: 4,
      path: "perda-de-peso",
    },
  ];

  const handleGetSurvey = (survey_id: number) => {
    getSurveys(survey_id).then((response) => {
      setSurvey(response.data);
    });
  };

  const handleClickTreatment = (survey_id: number) => {
    const surveyName = treatments.find(
      (treatment) => treatment.id === survey_id
    )?.path;
    if (surveyName) {
      localStorage.setItem("survey_name", surveyName.toString());
    }
    handleGetSurvey(survey_id);
    router.push(`${currentPath}/terms-and-conditions`);
  };

  return (
    <Flex flexDir="column" alignItems="center" bg="beige.100">
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
            <Box mt="4rem" key={treatment.name}>
              <Button
                justifyContent="center"
                alignItems="center"
                h="180px"
                w="180px"
                borderRadius="50%"
                bg="brand.50"
                onClick={() => handleClickTreatment(treatment.id)}
                _hover={{
                  background: "brand.100",
                  cursor: "pointer",
                  transform: "translateY(-10px)",
                  transitionDuration: "0.2s",
                  transitionTimingFunction: "ease-in-out",
                }}
              >
                {treatment.icon}
              </Button>
              <Text mt="2rem" textAlign="center" fontSize="2xl">
                {treatment.name}
              </Text>
            </Box>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
