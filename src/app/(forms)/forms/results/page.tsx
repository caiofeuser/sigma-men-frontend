"use client";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Spinner,
  IconButton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFormsIndex, FormsIndexContextType } from "@/context/forms";
import useAxios from "@/api/api";
import Image from "next/image";
import { ArrowForwardIcon, CloseIcon } from "@chakra-ui/icons";
import { useCartContext } from "@/context/cart";

export default function Results() {
  const lastOptionString = localStorage.getItem("lastOption");
  const lastOption = lastOptionString ? JSON.parse(lastOptionString) : null;
  const { survey } = useFormsIndex() as FormsIndexContextType;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [result, setResult] = useState<any>({});
  const { getSurveyResults, getProductsFilterdOnResult } = useAxios();
  const [recomendedProducts, setRecomendedProducts] = useState<any[]>([]);
  const { addItems } = useCartContext();

  const getResult = () => {
    const surveyName = survey
      ? survey.name
      : localStorage.getItem("survey_name") ?? "";
    const trackId = lastOption.redirect_to_track;
    getSurveyResults(surveyName, trackId).then((response) => {
      setResult(response.data);
      getProductsFilterdOnResult(surveyName, trackId).then((response) => {
        setRecomendedProducts(response.data);
        console.log(response.data);
        setIsLoading(false);
      });
    });
  };
  useEffect(() => {
    getResult();
  }, []);

  const handleClickRemove = (product_id: string) => {
    setRecomendedProducts((prev) =>
      prev.filter((product) => product.id !== product_id)
    );
  };

  const formatSurveyName = (surveyName: string) => {
    return surveyName.split("-").join(" ");
  };

  const formatToCart = (product: any) => {
    return {
      name: product.name,
      price: product.price_monetary || 0,
      id: product.id,
      quantity: 1,
      stripeID: product.stripeID,
      image: product?.image,
    };
  };

  const handleAddToCart = async () => {
    const formatedProducts = recomendedProducts.map((product) =>
      formatToCart(product)
    );
    addItems(formatedProducts);
  };

  return (
    <Flex flexDir="column" alignItems="center" bg="beige.100">
      {isLoading ? (
        <Spinner
          ml="8px"
          boxSize={88}
          color="brand.500"
          size="xl"
          thickness="4px"
          mt={12}
        />
      ) : (
        <>
          <Box mt={12}>
            <Heading textAlign="center">
              Tratamento para {formatSurveyName(result?.survey?.name)}
            </Heading>
          </Box>
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
            <Text as="b" fontSize="xl" mb={8}>
              Seu tratamento essencial:
            </Text>
            <Flex flexDir="column" rowGap={8}>
              {recomendedProducts.map((product) => {
                const src = product.image[0];
                return (
                  <Flex
                    borderRadius="2xl"
                    border="1px solid"
                    borderColor="brand.500"
                    w="40%"
                    key={product.id}
                  >
                    <Box margin="auto">
                      <Image
                        loader={() => src}
                        src={src}
                        alt="hero"
                        width={160}
                        height={176}
                        // layout="responsive"
                      />
                    </Box>
                    <Flex
                      w="100%"
                      p={6}
                      flexDir="column"
                      borderRightRadius="2xl"
                      bg="brand.50"
                      rowGap={2}
                    >
                      <Flex justifyContent="space-between" alignItems="center">
                        <Text as="b" fontSize="xl">
                          {product.name}
                        </Text>
                        <IconButton
                          aria-label="Remove item"
                          borderRadius="full"
                          size="sm"
                          icon={<CloseIcon />}
                          variant="ghost"
                          colorScheme="brand"
                          onClick={() => handleClickRemove(product.id)}
                        />
                      </Flex>
                      <Text fontSize="lg" as="b">
                        R$ {product.price_monetary}
                      </Text>
                      <Text fontSize="sm">{product.description}</Text>
                      <Box mt={3}>
                        <Button
                          bg="white"
                          minW="fit-content"
                          w="40%"
                          minH="2rem"
                          maxH="2rem"
                          borderColor="brand.500"
                          borderRadius="2rem"
                          _hover={{ bg: "white" }}
                          variant="outline"
                          rightIcon={<ArrowForwardIcon />}
                        >
                          Saiba Mais
                        </Button>
                      </Box>
                    </Flex>
                  </Flex>
                );
              })}
            </Flex>
          </Flex>
        </>
      )}
      <Flex justifyContent="center" mt="2rem" columnGap={32}>
        <Button
          colorScheme="brand"
          height="3rem"
          fontSize="lg"
          borderRadius="full"
          onClick={() => handleAddToCart()}
        >
          Adicionar produtos ao carrinho
        </Button>
      </Flex>
    </Flex>
  );
}
