"use client";
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
import { useCartContext } from "@/context/cart";
import useAxios from "@/api/api";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  ArrowForwardIcon,
  MinusIcon,
  AddIcon,
  ArrowBackIcon,
} from "@chakra-ui/icons";
import { CartItem } from "@/types";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/authentication";
import { Suspense } from "react";

export default function Checkout() {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isAlreadyChecked, setIsAlreadyChecked] = useState(false);
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const pathName = usePathname();
  const {
    cartItems,
    handleAddSameToCart,
    handleSubtractSameFromCart,
    handleTotalQuantity,
    clearCart,
  } = useCartContext();
  const { postCartCheckout } = useAxios();
  const router = useRouter();

  const handleCheckout = () => {
    // setIsButtonLoading(true);

    postCartCheckout(cartItems).then(
      (data) => {
        router.push(data.url);
        setIsAlreadyChecked(true);
      },
      (error) => {
        console.error(error);
        // alert("Erro ao finalizar a compra");
      }
    );
  };

  const handleCheckStatus = () => {
    // checkout?success=true&session_id=cs_test_b105dqvnclgeFIeHPTXbpPVIayovVhGcduMiaZeEp4k6O5npcmeDGEIofn
    const isSuccessful = searchParams.get("success") === "true";
    const isCanceled = searchParams.get("canceled") === "true";
    const sessionID = searchParams.get("session_id");

    if (isSuccessful) {
      clearCart();
      alert(`Compra ${sessionID} realizada com sucesso!`);
    } else if (isCanceled) {
      alert(`Compra ${sessionID} cancelada!`);
    }
  };

  useEffect(() => {
    // if (isAlreadyChecked) {
    handleCheckStatus();
    // }
  }, []);

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Flex justifyContent="center">
        <Box bg="white" m="2rem" px="2rem" w="100%" borderRadius="2rem">
          <Heading as="h3" size="2xl" m="2rem" mb="4rem" textAlign="center">
            Carrinho de compras
          </Heading>
          {cartItems.length !== 0 ? (
            <>
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
                  </Table>
                </TableContainer>
              </Flex>
              <Box position="sticky" bottom="0" bg="white">
                <Box mt="2rem">
                  <Button
                    rounded="full"
                    bg="white"
                    variant="outline"
                    _hover={{
                      color: "red",
                      background: "#f7dcdc",
                      borderColor: "red",
                    }}
                    onClick={() => {
                      clearCart();
                    }}
                  >
                    Limpar o carrinho
                  </Button>
                </Box>
                <Flex justifyContent="end" p={8}>
                  <Grid
                    templateColumns="repeat(2, 1fr)"
                    columnGap={16}
                    rowGap={4}
                  >
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
            </>
          ) : (
            <Flex
              minH="calc(100vh - 600px)"
              justifyContent="center"
              alignItems="center"
              p="2rem"
            >
              <Text fontSize="2xl">Seu carrinho está vazio :( </Text>
            </Flex>
          )}
        </Box>
      </Flex>
    </Suspense>
  );
}
