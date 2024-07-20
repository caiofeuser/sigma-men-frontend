"use client";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Radio,
  RadioGroup,
  background,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import useAxios from "@/api/api";
import { useFormsIndex, FormsIndexContextType } from "@/context/forms";
import { OptionType, QuestionsType } from "@/types/index";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

export default function Survey() {
  const [radioValue, setRadioValue] = useState<string>("");
  const [selectedQuestion, setSelectedQuestion] =
    useState<QuestionsType | null>(null);
  const {
    questions,
    setQuestions,
    position,
    setPosition,
    survey,
    setLastRadioValue,
    lastRadioValue,
  } = useFormsIndex() as FormsIndexContextType;
  const { getSurveyQuestions, getQuestionsOptions } = useAxios();
  const router = useRouter();

  useEffect(() => {
    const selectedQuestionOnTime = questions?.find(
      (question: QuestionsType) => question.position === position
    );
    setSelectedQuestion(selectedQuestionOnTime || null);
  }, [position, questions]);

  const checkIsLastQuestion = (question: QuestionsType) => {
    if (!survey) return;
    const actualQuestion = question.position;
    const numberOfQuestions = survey?.number_of_questions;
    const numberOfQuestionsFixed = numberOfQuestions - 1;
    const isLastQuestion = actualQuestion === numberOfQuestionsFixed;
    return isLastQuestion;
  };

  const handleClickRadio = (option_id: string) => {
    console.log(option_id);
    if (selectedQuestion) {
      const indexOption = parseInt(option_id) - 1;
      //console.log(radioValue);
      const lastOption = selectedQuestion.options[indexOption];
      //console.log(lastOption);
      localStorage.setItem("lastOption", JSON.stringify(lastOption));
      if (checkIsLastQuestion(selectedQuestion)) {
        console.log("last question");
        if (survey) {
          router.push(`results`);
        }
      } else {
        setPosition(position + 1);
      }
    }
  };

  useEffect(() => {
    getSurveyQuestions("queda-de-cabelo").then((response) => {
      setQuestions(response.data);
    });
  }, []);

  //  useEffect(() => {
  //    console.log(radioValue);
  //  }, [radioValue]);

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Flex
        flexDir="column"
        alignItems="center"
        bg="beige.100"
        onClick={() => console.log(questions)}
      >
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
          <Text textAlign="center" fontSize="xl" as="b">
            {selectedQuestion?.question}
          </Text>
          <Flex mt={12}>
            <RadioGroup
              width="full"
              onChange={(value) => {
                setRadioValue(value);
                handleClickRadio(value); // Call handleClickRadio when radio value changes
              }}
              value={radioValue}
              display="flex"
              flexDir="column"
              rowGap={8}
            >
              {selectedQuestion?.options.map((option) => (
                <Box
                  key={option.id}
                  bg="beige.100"
                  _hover={{
                    background: "var(--chakra-colors-beige-400)",
                  }}
                  width="full"
                  height="full"
                  borderRadius="2xl"
                >
                  <Radio
                    colorScheme="brand"
                    width="full"
                    height="full"
                    p={6}
                    value={option.id.toString()}
                  >
                    <Text fontSize="large">{option.option}</Text>
                  </Radio>
                </Box>
              ))}
            </RadioGroup>
          </Flex>
        </Flex>
      </Flex>
    </Suspense>
  );
}
