"use client";
import Orders from "@/components/Orders";
import {
  Box,
  Text,
  Heading,
  Flex,
  Button,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Grid,
  GridItem,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import UserInfo from "@/components/UserInfo";
import { useCartContext } from "@/context/cart";
import useAxios from "@/api/api";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import {
  ArrowForwardIcon,
  MinusIcon,
  AddIcon,
  ArrowBackIcon,
} from "@chakra-ui/icons";
import { CartItem } from "@/types";
import { useState } from "react";

export default function Checkout() {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const {
    cartItems,
    handleAddSameToCart,
    handleSubtractSameFromCart,
    handleTotalQuantity,
    clearCart,
  } = useCartContext();
  const { postCartCheckout } = useAxios();
  const router = useRouter();
  // const user = "Caio";
  // const handleSaudation = () => {
  //   const dateHours = new Date().getHours();
  //   if (dateHours >= 4 && dateHours < 12) {
  //     return `Bom dia, ${user}!`;
  //   } else if (dateHours >= 12 && dateHours < 18) {w
  //     return `Boa tarde, ${user}!`;
  //   } else {
  //     return `Boa noite, ${user}!`;
  //   }
  // };

  const handleCheckout = () => {
    setIsButtonLoading(true);
    postCartCheckout(cartItems).then(
      (data) => {
        router.push(data.url);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  return (
    <Flex justifyContent="center">
      <Box bg="white" m="2rem" px="2rem" w="100%" borderRadius="2rem">
        <Heading as="h3" size="2xl" m="2rem" mb="4rem" textAlign="center">
          Carrinho de compras
        </Heading>
        <Flex w="100%">
          <TableContainer w="100%">
            <Table variant="simple">
              <TableCaption>
                Confira a quantiade dos items comprados
              </TableCaption>
              <Thead>
                <Tr>
                  <Th>Produto</Th>
                  <Th>Preço</Th>
                  <Th>Quantidade</Th>
                  <Th isNumeric>Total</Th>
                </Tr>
              </Thead>
              <Tbody>
                {cartItems.map((item: CartItem, index) => (
                  <Tr key={index} fontSize="x-large">
                    <Td width="35%">
                      <Flex
                        justifyContent="center"
                        alignItems="center"
                        h="150px"
                        width="200px"
                      >
                        <Image
                          loader={() => item.image?.[0] || ""}
                          src={item.image?.[0] || ""}
                          alt="produto1"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%" }}
                        />
                      </Flex>
                    </Td>
                    <Td>R$ {item.price}</Td>
                    <Td>
                      <Flex
                        fontSize="large"
                        border="1px"
                        borderColor="brand.200"
                        borderRadius="2rem"
                        justifyContent="space-between"
                        alignItems="center"
                        maxW="150px"
                      >
                        <IconButton
                          rounded="full"
                          variant="ghost"
                          onClick={() => handleAddSameToCart(item)}
                          aria-label="Adicionar ao carrinho"
                          colorScheme="brand"
                        >
                          <Icon color="black.500" as={AddIcon} />
                        </IconButton>
                        {item.quantity}
                        <IconButton
                          rounded="full"
                          variant="ghost"
                          onClick={() => handleSubtractSameFromCart(item)}
                          aria-label="Remover do carrinho"
                          colorScheme="brand"
                        >
                          <Icon color="black.500" as={MinusIcon} />
                        </IconButton>
                      </Flex>
                    </Td>
                    <Td isNumeric>R$ {item.price * item.quantity}</Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot></Tfoot>
            </Table>
          </TableContainer>
        </Flex>
        <Box mt="2rem">
          <Button
            rounded="full"
            bg="white"
            _hover={{ color: "red", background: "#f7dcdc" }}
            onClick={() => {
              clearCart();
            }}
          >
            Limpar o carrinho
          </Button>
        </Box>
        <Flex justifyContent="end" p={8}>
          <Grid templateColumns="repeat(2, 1fr)" columnGap={16} rowGap={4}>
            <GridItem>
              <Text fontSize="3xl">Sutotal:</Text>
            </GridItem>
            <GridItem>
              <Text fontSize="3xl" as="b">
                R$ {handleTotalQuantity()}
              </Text>
            </GridItem>
            <GridItem colSpan={2}>
              <Button
                rightIcon={<ArrowForwardIcon />}
                rounded="full"
                colorScheme="brand"
                disabled={cartItems?.length === 0}
                onClick={handleCheckout}
                py={2}
                w="100%"
                size="lg"
                isLoading={isButtonLoading}
              >
                Finalizar compra
              </Button>
            </GridItem>
            <GridItem colSpan={2}>
              <Button
                leftIcon={<ArrowBackIcon />}
                onClick={() => router.push("/")}
                rounded="full"
                w="100%"
              >
                Continuar comprando
              </Button>
            </GridItem>
          </Grid>
        </Flex>
      </Box>
    </Flex>
  );
}
