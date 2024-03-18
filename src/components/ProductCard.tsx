"use client";
import React from "react";
import { Box, Flex, Text, Heading, Button } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCartContext } from "@/context/cart";
import { CartContextType, CartItem } from "@/types";
import { useNavbarContext } from "@/context/navbar";
import { ProductCardProps } from "@/types";

export default function ProductCard(props: ProductCardProps) {
  const { title, price, id } = props;
  const { cartItems, addItem } = useCartContext();
  const { isOpenCart, setIsOpenCart, setShouldCloseCartMenu } =
    useNavbarContext();
  const router = useRouter();

  // const handleClickProduct = (
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => {
  //   router.push("https://buy.stripe.com/test_00g4hU2E94Ci6o8000");
  //   console.log({ title, price });
  // };

  // const handleClickProduct = (item: CartItem) => {
  //   addItem({
  //     title,
  //     price: price || 0,
  //     id: 0,
  //     quantity: 1,
  //   });
  //   if (!isOpenCart) {
  //     setIsOpenCart(true);
  //   }
  // };

  return (
    <Box minW="18rem" maxH="100%" bg="brand.50" borderRadius="2rem">
      <Flex flexDir="column" alignItems="center">
        <Flex width="100%" px={4} mt={4} justifyContent="space-between">
          <Heading
            fontSize="xl"
            as="b"
            verticalAlign="middle"
            // textAlign="center"
            noOfLines={2}
          >
            {title}
          </Heading>
          <Flex
            height="2rem"
            bg="brand.100"
            borderRadius="2rem"
            px={4}
            alignItems="center"
            minW="5rem"
          >
            <Text opacity={0.5} align="center" whiteSpace="nowrap">
              R$ {price}
            </Text>
          </Flex>
        </Flex>
        <Image src="/product.png" alt="hero" width={160} height={176} />
        <Text as="u" fontSize="smaller" opacity={0.5}>
          Informação de seguraça
        </Text>
        <Flex my={4} justifyContent="space-evenly" w="100%">
          <Button
            bg="white"
            w="7rem"
            borderRadius="2rem"
            _hover={{ bg: "brand.100" }}
          >
            Saiba Mais
          </Button>
          <Button
            onMouseEnter={() => setShouldCloseCartMenu(false)}
            onMouseLeave={() => setShouldCloseCartMenu(true)}
            onClick={() => {
              addItem({
                title,
                price: price || 0,
                id: id || 0,
                quantity: 1,
              });
              if (!isOpenCart) {
                setIsOpenCart(true);
              }
            }}
            w="7rem"
            colorScheme="brand"
            borderRadius="2rem"
          >
            Comprar
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
