"use client";
import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  Collapse,
  IconButton,
} from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import Image from "next/image";

interface QuestionProps {
  question: string;
  answer: string;
}

export default function Question(props: QuestionProps) {
  const [isShowingAnswer, setIsShowingAnswer] = useState(false);
  return (
    <Box
      bg="beige"
      borderRadius="2rem"
      minH="7rem"
      onClick={() => setIsShowingAnswer(!isShowingAnswer)}
      minW="100%"
      p="2rem"
    >
      <Flex flexDir="column" alignItems="center">
        <Heading textAlign="center" mb="2rem">
          {props.question}
        </Heading>
        <IconButton
          // bg="white"
          color="primary"
          variant="ghost"
          w="2rem"
          aria-label="Mostrar resposta"
          icon={
            isShowingAnswer ? (
              <ChevronUpIcon boxSize={8} />
            ) : (
              <ChevronDownIcon boxSize={8} />
            )
          }
        />
      </Flex>
      <Collapse in={isShowingAnswer}>
        <Text m="auto" w="90%">
          {props.answer}
        </Text>
      </Collapse>
    </Box>
  );
}
