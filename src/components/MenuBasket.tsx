"use client";
import { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { SlBasket } from "react-icons/sl";
import { MinusIcon, DeleteIcon } from "@chakra-ui/icons";
import { RiLoginCircleFill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import {
  IconButton,
  Text,
  Icon,
  Flex,
  Menu,
  MenuList,
  MenuGroup,
  MenuButton,
  Button,
  Box,
} from "@chakra-ui/react";
import Image from "next/image";

interface basketItems {
  title: string;
  total: number;
  price: number;
  quantity: number;
}

export default function MenuBasket() {
  const router = useRouter();
  const handleAddToCart = (index: number) => {
    setBasketItems((prev) => {
      const newBasket = prev.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            quantity: item.quantity + 1,
            total: item.price * item.quantity,
          };
        }
        return item;
      });
      return newBasket;
    });
  };
  const handleSubtractFromCart = (index: number) => {
    setBasketItems((prev: basketItems[]) => {
      // remove if the quantity is 1
      if (prev[index].quantity === 1) {
        return prev.filter((_, i) => i !== index);
      }
      const newBasket = prev.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            quantity: item.quantity - 1,
            total: item.price * item.quantity,
          };
        }
        return item;
      });
      return newBasket;
    });
  };

  const handleRemoveFromCart = (index: number) => {
    setBasketItems((prev: basketItems[]) => {
      return prev.filter((_, i) => i !== index);
    });
  };
  const [basketItems, setBasketItems] = useState([
    {
      title: "Produto 1",
      total: 100,
      price: 100,
      quantity: 2,
    },
    {
      title: "Produto 2",
      total: 200,
      price: 200,
      quantity: 1,
    },
  ] as basketItems[]);
  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={IconButton}
        colorScheme="black.500"
        variant="ghost"
        icon={<SlBasket size="24" />}
        aria-label="Open basket"
      />
      <MenuList>
        <MenuGroup title="Seu carrinho">
          {basketItems.length === 0 ? (
            <Flex
              minW="440px"
              w="100%"
              justifyContent="center"
              alignItems="center"
            >
              <Text p="4rem">Carrinho vazio :( </Text>
            </Flex>
          ) : (
            //
            <>
              {basketItems.map((item, index) => (
                <Flex px="2rem" key={item.title} alignItems="center" gap={4}>
                  <Image
                    src="/product.png"
                    alt="produto1"
                    width={50}
                    height={50}
                  />
                  <Text>
                    {item.title} ({item.quantity})
                  </Text>
                  <Flex>
                    <Button
                      rounded="full"
                      size="sm"
                      variant="ghost"
                      onClick={() => handleAddToCart(index)}
                      aria-label="Adicionar ao carrinho"
                    >
                      <Icon color="black.500" as={IoMdAddCircle} />
                    </Button>
                    <IconButton
                      rounded="full"
                      size="sm"
                      variant="ghost"
                      onClick={() => handleSubtractFromCart(index)}
                      aria-label="Remover do carrinho"
                    >
                      <Icon color="black.500" as={MinusIcon} />
                    </IconButton>
                  </Flex>
                  <IconButton
                    rounded="full"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveFromCart(index)}
                    aria-label="Remover do carrinho"
                  >
                    <Icon color="black.500" as={DeleteIcon} />
                  </IconButton>
                  <Text>R${item.price},00</Text>
                </Flex>
              ))}
            </>
          )}
        </MenuGroup>
        <Box textAlign="right" px="2rem" mt="1rem">
          <Text fontWeight="bold">
            Total: R${basketItems.reduce((acc, item) => acc + item.total, 0)},00
          </Text>
          <Box textAlign="center" mt="1.5rem">
            <Button
              colorScheme="brand"
              onClick={() => {
                router.push("/basket");
              }}
              leftIcon={<RiLoginCircleFill />}
              rounded="full"
              variant="ghost"
            >
              Finalizar compra
            </Button>
          </Box>
        </Box>
      </MenuList>
    </Menu>
  );
}
