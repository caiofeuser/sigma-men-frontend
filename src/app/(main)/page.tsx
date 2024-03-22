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
import useAxios from "@/api/api";
import { ProductType } from "@/types";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const ProductTriggerRef = useRef(null);
  const [isProductTriggerVisible, setIsProductTriggerVisible] = useState(false);
  const [products, setProducts] = useState<ProductType[]>([]);
  const { getAllProducts } = useAxios();
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
    { name: "Queda de cabelo" },
    { name: "Queda de cabelo" },
    { name: "Queda de cabelo" },
    { name: "Queda de cabelo" },
    { name: "Queda de cabelo" },
    { name: "Queda de cabelo" },
  ];

  useEffect(() => {
    getAllProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error(error);
        setProducts([]);
      });
  }, []);

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
      <Carrosel
        //@ts-ignore
        cardComponent={TreatmentCard}
        cardsData={cards}
      />
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
            <Carrosel
              //@ts-ignore
              cardComponent={ProductCard}
              cardsData={products}
            />
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
