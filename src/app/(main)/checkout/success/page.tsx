"use client";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  TableContainer,
  Table,
  Td,
  Thead,
  Tr,
  Th,
  Tbody,
} from "@chakra-ui/react";
import "./success.css";
import { useEffect, useState, Fragment } from "react";
import useAxios from "@/api/api";
import { CheckoutItems } from "@/types";
import Image from "next/image";
import { useCartContext } from "@/context/cart";
import { Spinner } from "@chakra-ui/react";

export default function Success() {
  const searchParams = useSearchParams();

  const sessionId = searchParams.get("session_id");
  const [showCheckIcon, setShowCheckIcon] = useState(false);
  const [productsCheckout, setProductsCheckout] = useState<CheckoutItems[]>([]);
  const { getProductsOfCheckout } = useAxios();
  const { clearCart } = useCartContext();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowCheckIcon(true);
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    if (!sessionId) return;
    getProductsOfCheckout(sessionId).then((data: CheckoutItems[]) => {
      clearCart();
      setProductsCheckout(data);
      setIsLoading(false);
    });
  }, [sessionId]);

  const CheckIcon = () => {
    return (
      <div className="success-checkmark">
        <div className="check-icon">
          <span className="icon-line line-tip"></span>
          <span className="icon-line line-long"></span>
          <div className="icon-circle"></div>
          <div className="icon-fix"></div>
        </div>
      </div>
    );
  };

  return (
    <Flex flexDir="column" rowGap={12} pt="5rem" h="100%" pb="3rem">
      <Heading textAlign="center">
        Compra realizada com
        <span style={{ color: "var(--chakra-colors-brand-500)" }}>
          {" "}
          sucesso
        </span>
        !
      </Heading>
      {/* <Fragment> */}
      <Flex justifyContent="center" alignItems="center" h="150px" w="100%">
        {!isLoading ? (
          <div>
            <CheckIcon />
          </div>
        ) : (
          <Spinner
            ml="8px"
            boxSize={88}
            color="brand.500"
            size="xl"
            thickness="4px"
          />
        )}
      </Flex>
      {!isLoading && (
        <>
          <Text textAlign="center" fontSize="x-large">
            Obrigado por comprar conosco!
          </Text>
          <Flex flexDir="column">
            <Flex
              justifyContent="space-between"
              alignItems="center"
              py="1rem"
              mx="4rem"
            >
              <TableContainer w="100%">
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Produto</Th>
                      <Th isNumeric>Preço</Th>
                      <Th isNumeric>Quantidade</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {productsCheckout.map((product: CheckoutItems) => (
                      <Tr key={product.product_id}>
                        <Td>
                          <Flex gap={8} alignItems="center">
                            <Image
                              src={product.image || ""}
                              alt={product.name || ""}
                              loader={() => product.image || ""}
                              width={100}
                              height={100}
                            />
                            <Text>{product.name}</Text>
                          </Flex>
                        </Td>
                        <Td isNumeric>R$ {product.price}</Td>
                        <Td isNumeric>{product.quantity}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Flex>
          </Flex>
          <Flex justifyContent="center" mt="2rem">
            <Button colorScheme="brand" onClick={() => router.push("/")}>
              Voltar para a página inicial
            </Button>
          </Flex>
        </>
      )}
    </Flex>
  );
}
