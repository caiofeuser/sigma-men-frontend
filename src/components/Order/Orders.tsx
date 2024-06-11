"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Button,
  Icon,
  Divider,
  Collapse,
  IconButton,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import { CiShoppingBasket } from "react-icons/ci";
import Order from "./Order";
import { useRouter, usePathname } from "next/navigation";
import useAxios from "@/api/api";
import { OrderType } from "@/types";

export default function Orders() {
  const router = useRouter();
  const pathname = usePathname();
  const { getOrders } = useAxios();
  const [orders, setOrders] = useState<OrderType[]>([]);

  useEffect(() => {
    getOrders().then(
      (response) => {
        setOrders(response.data);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);
  return (
    <Box mt="2rem" width="100%" p="2rem">
      <Flex alignItems="center" gap="2rem">
        <Icon color="black.500" w="3rem" h="3rem" as={CiShoppingBasket} />
        <Heading fontSize="2xl" as="b">
          Meus pedidos
        </Heading>
      </Flex>
      <Flex
        borderRadius="2rem"
        p="2rem"
        flexDir="column"
        rowGap={4}
        mt="1rem"
        mr="2rem"
      >
        <Grid templateColumns="repeat(4, 1fr)" justifyItems="stretch">
          <GridItem p="1rem" pb="0">
            <Text as="b">Número do pedido</Text>
          </GridItem>
          <GridItem p="1rem" pb="0">
            <Text as="b">Data</Text>
          </GridItem>
          <GridItem p="1rem" pb="0">
            <Text as="b">Total</Text>
          </GridItem>
          <GridItem p="1rem" pb="0">
            <Text as="b">Status</Text>
          </GridItem>
        </Grid>
      </Flex>
      <Flex p="2rem" pt="0" flexDir="column" rowGap={4}>
        {orders?.map((order: OrderType, index: number) => (
          // @ts-ignore
          <Order key={index} order={order} />
        ))}
      </Flex>
    </Box>
  );
}
