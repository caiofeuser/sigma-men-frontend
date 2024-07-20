"use client";
import { Box, Heading, Flex, Text } from "@chakra-ui/react";
import BannerHero from "@/components/MainPage/BannerHero";
import Carrosel from "@/components/MainPage/Carrosel";
import TreatmentCard from "@/components/MainPage/TreatmentCard";
import ProductCard from "@/components/MainPage/ProductCard";
import Question from "@/components/MainPage/Question";
import { useNavbarContext } from "@/context/navbar";
import { useEffect, useRef, useState, Suspense } from "react";
import useAxios from "@/api/api";
import { ProductType } from "@/types";

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
    <Suspense fallback={<div>Carregando...</div>}>
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
    </Suspense>
  );
}
