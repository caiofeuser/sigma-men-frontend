"use client";
import { createContext, useContext, useState } from "react";
import { OptionType, QuestionsType, SurveyType } from "@/types/index";

const FormsIndexContext = createContext({});

export function FormsIndexWrapper({ children }: { children: React.ReactNode }) {
  const [position, setPosition] = useState<number>(0);
  const [questions, setQuestions] = useState<QuestionsType[]>([]);
  const [survey, setSurvey] = useState<SurveyType>();
  const [lastRadioValue, setLastRadioValue] = useState<
    OptionType | undefined
  >();

  return (
    <FormsIndexContext.Provider
      value={{
        position,
        setPosition,
        questions,
        setQuestions,
        survey,
        setSurvey,
        lastRadioValue,
        setLastRadioValue,
      }}
    >
      {children}
    </FormsIndexContext.Provider>
  );
}

export function useFormsIndex() {
  return useContext(FormsIndexContext);
}

export type FormsIndexContextType = {
  position: number;
  setPosition: React.Dispatch<React.SetStateAction<number>>;
  questions: QuestionsType[];
  setQuestions: React.Dispatch<React.SetStateAction<QuestionsType[]>>;
  survey: SurveyType | undefined;
  setSurvey: React.Dispatch<React.SetStateAction<SurveyType | undefined>>;
  setLastRadioValue: React.Dispatch<
    React.SetStateAction<SurveyType | undefined>
  >;
  lastRadioValue: OptionType | undefined;
};
