"use client";
import { useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { SlBasket } from "react-icons/sl";
import { MinusIcon, DeleteIcon } from "@chakra-ui/icons";
import { RiLoginCircleFill } from "react-icons/ri";
import { useRouter, usePathname } from "next/navigation";
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
  Badge,
} from "@chakra-ui/react";
import Image from "next/image";
import { useCartContext } from "@/context/cart";
import { useNavbarContext } from "@/context/navbar";
import useAxios from "@/api/api";

export default function MenuCart() {
  const router = useRouter();
  const currentPath = usePathname();
  const { postCartCheckout } = useAxios();
  const { isOpenCart, setIsOpenCart, shouldCloseCartMenu } = useNavbarContext();
  const {
    cartItems,
    handleAddSameToCart,
    handleSubtractSameFromCart,
    handleRemoveFromCart,
    handleTotalQuantity,
  } = useCartContext();

  useEffect(() => {
    handleTotalQuantity();
  }, [cartItems]);

  useEffect(() => {}, []);

  const handleCheckout = () => {
    router.push("/checkout");
    setIsOpenCart(false);
  };
  return (
    <Menu
      closeOnSelect={false}
      isOpen={isOpenCart}
      onClose={() => (shouldCloseCartMenu ? setIsOpenCart(false) : null)}
    >
      <Box position="relative">
        <MenuButton
          onClick={() => setIsOpenCart(!isOpenCart)}
          as={IconButton}
          colorScheme="black.500"
          variant="ghost"
          icon={<SlBasket size="24" />}
          aria-label="Open basket"
        />
        {cartItems.length > 0 && (
          <Badge
            colorScheme="brand"
            pos="absolute"
            variant="solid"
            right={-1}
            top={-1}
            rounded="full"
            width="1.25rem"
            height="1.25rem"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {cartItems.length}
          </Badge>
        )}
      </Box>
      <MenuList>
        <MenuGroup title="Seu carrinho">
          {cartItems.length === 0 ? (
            <Flex
              minW="600px"
              w="100%"
              justifyContent="center"
              alignItems="center"
            >
              <Text p="4rem">Carrinho vazio :( </Text>
            </Flex>
          ) : (
            //
            <>
              {cartItems.map((item, index) => (
                <Flex
                  px="2rem"
                  onClick={() => console.log(item)}
                  key={index}
                  alignItems="center"
                  gap={4}
                  minW="600px"
                  justifyContent="space-between"
                >
                  <Image
                    loader={() => item.image?.[0] || ""}
                    src={item.image?.[0] || ""}
                    alt="produto1"
                    width={50}
                    height={50}
                  />
                  <Text>
                    {item.name} ({item.quantity})
                  </Text>
                  <Flex gap={4}>
                    <Button
                      rounded="full"
                      variant="ghost"
                      onClick={() => handleAddSameToCart(item)}
                      aria-label="Adicionar ao carrinho"
                    >
                      <Icon color="black.500" as={IoMdAddCircle} />
                    </Button>
                    <IconButton
                      rounded="full"
                      variant="ghost"
                      onClick={() => handleSubtractSameFromCart(item)}
                      aria-label="Remover do carrinho"
                    >
                      <Icon color="black.500" as={MinusIcon} />
                    </IconButton>
                  </Flex>
                  <IconButton
                    rounded="full"
                    variant="ghost"
                    onClick={() => handleRemoveFromCart(item)}
                    aria-label="Remover do carrinho"
                  >
                    <Icon color="black.500" as={DeleteIcon} />
                  </IconButton>
                  <Text>R${item.total ? item.total : item.price}</Text>
                </Flex>
              ))}
            </>
          )}
        </MenuGroup>
        {cartItems.length !== 0 && (
          <Box textAlign="right" px="2rem" mt="1rem">
            <Text fontWeight="bold">
              Total: R$
              {handleTotalQuantity()}
            </Text>
            <Box textAlign="center" mt="1.5rem">
              <Button
                colorScheme="brand"
                onClick={() => {
                  handleCheckout();
                }}
                leftIcon={<RiLoginCircleFill />}
                rounded="full"
                variant="ghost"
              >
                Finalizar compra
              </Button>
            </Box>
          </Box>
        )}
      </MenuList>
    </Menu>
  );
}
