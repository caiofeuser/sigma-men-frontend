"use client";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Box, Heading, Flex, Text } from "@chakra-ui/react";
import BannerHero from "@/components/BannerHero";
import Carrosel from "@/components/Carrosel";
import TreatmentCard from "@/components/TreatmentCard";
import ProductCard from "@/components/ProductCard";
import Question from "@/components/Question";
import { useNavbarContext } from "@/context/navbar";
import { useEffect, useRef, useState, Fragment } from "react";

const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  const ProductTriggerRef = useRef(null);
  const [isProductTriggerVisible, setIsProductTriggerVisible] = useState(false);

  const { setIsNavbarVisible } = useNavbarContext();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsNavbarVisible(true);
        setIsProductTriggerVisible(true);
      } else {
        setIsNavbarVisible(false);
        setIsProductTriggerVisible(false);
      }
    });

    if (ProductTriggerRef.current) {
      observer.observe(ProductTriggerRef.current);
    }
  }, []);

  const cards = [
    { title: "Queda de cabelo" },
    { title: "Queda de cabelo" },
    { title: "Queda de cabelo" },
    { title: "Queda de cabelo" },
    { title: "Queda de cabelo" },
    { title: "Queda de cabelo" },
  ];

  const products = [
    {
      id: 1,
      title: "Product 1",
      price: 100,
      stripeID: "price_1Oui9lDNIBwjvC1bUyo4bpiy",
    },
    {
      id: 2,
      title: "Product 2",
      price: 200,
      stripeID: "price_1OuiCQDNIBwjvC1bS2ybppPZ",
    },
    {
      id: 3,
      title: "Product 3",
      price: 300,
      stripeID: "price_1OuiD7DNIBwjvC1bhnkJsknQ",
    },

    {
      id: 4,
      title: "Product 4",
      price: 400,
      stripeID: "price_1OuiDpDNIBwjvC1brb7QSO2h",
    },
    {
      id: 5,
      title: "Product 5",
      price: 400,
      stripeID: "price_1OuiEgDNIBwjvC1bH2MWxF1H",
    },
  ];

  const questions = [
    {
      question: "O quem é a Sigma Men?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt dignissim lorem et feugiat. Suspendisse lacus nisl, bibendum fringilla dui quis, vehicula ullamcorper est. Nam in tincidunt turpis. Nulla facilisi. Vivamus ipsum mi, vehicula sitamet eros at, commodo elementum est.consectetur adipiscing elit. Vivamus tincidunt dignissim lorem et feugiat. Suspendisse lacus nisl, bibendum fringilla dui quis, vehicula ullamcorper est. Nam in tincidunt turpis. Nulla facilisi. Vivamus ipsum mi, vehicula sitamet eros at, commodo elementum est. ",
    },
    {
      question: "Como a Sigma Men funciona?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt dignissim lorem et feugiat. Suspendisse lacus nisl, bibendum fringilla dui quis, vehicula ullamcorper est. Nam in tincidunt turpis. Nulla facilisi. Vivamus ipsum mi, vehicula sitamet eros at, commodo elementum est.consectetur adipiscing elit. Vivamus tincidunt dignissim lorem et feugiat. Suspendisse lacus nisl, bibendum fringilla dui quis, vehicula ullamcorper est. Nam in tincidunt turpis. Nulla facilisi. Vivamus ipsum mi, vehicula sitamet eros at, commodo elementum est. ",
    },
    {
      question: "Como a Sigma Men funciona?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt dignissim lorem et feugiat. Suspendisse lacus nisl, bibendum fringilla dui quis, vehicula ullamcorper est. Nam in tincidunt turpis. Nulla facilisi. Vivamus ipsum mi, vehicula sitamet eros at, commodo elementum est.consectetur adipiscing elit. Vivamus tincidunt dignissim lorem et feugiat. Suspendisse lacus nisl, bibendum fringilla dui quis, vehicula ullamcorper est. Nam in tincidunt turpis. Nulla facilisi. Vivamus ipsum mi, vehicula sitamet eros at, commodo elementum est.",
    },
  ];
  return (
    <>
      <BannerHero />
      <Carrosel cardComponent={TreatmentCard} cardsData={cards} />
      <Box>
        <Text px={12} fontSize="5xl" mb="0rem" as="b">
          Nossos
          <span style={{ color: "var(--chakra-colors-brand-500)" }}>
            {" "}
            produtos
          </span>
        </Text>
        <div ref={ProductTriggerRef}>
          <div
            style={{
              opacity: isProductTriggerVisible ? 1 : 0,
              transition: "opacity 1.5s",
            }}
          >
            <Carrosel cardComponent={ProductCard} cardsData={products} />
          </div>
          <Box px={12}>
            <Heading fontSize="5xl" as="b">
              Alguma
              <span style={{ color: "var(--chakra-colors-brand-500)" }}>
                {" "}
                dúvida?
              </span>
            </Heading>
            <Flex
              flexDir="column"
              alignItems="center"
              justifyContent="center"
              gap={12}
              my="3rem"
              mx="4rem"
            >
              {questions.map((question, index) => (
                <Question
                  key={index}
                  question={question.question}
                  answer={question.answer}
                />
              ))}
            </Flex>
          </Box>
        </div>
      </Box>
    </>
  );
}
