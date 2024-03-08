"use client";
import React, { Fragment } from "react";
import {
  Box,
  Flex,
  Heading,
  Button,
  Icon,
  Divider,
  Collapse,
  IconButton,
} from "@chakra-ui/react";
import { CiShoppingBasket } from "react-icons/ci";
import Order from "./Order";
import { useRouter, usePathname } from "next/navigation";

interface OrderType {
  id: number;
  date: string;
  total: number;
  orderNumber: string;
  items: {
    title: string;
    price: number;
    quantity: number;
  }[];
}

export default function Orders() {
  const router = useRouter();
  const pathname = usePathname();
  const orders = [
    {
      id: 1,
      orderNumber: "213414512341",
      date: "2021/09/01",
      total: 100,
      items: [
        {
          title: "Produto 1",
          price: 100,
          quantity: 1,
        },
      ],
    },
    {
      id: 2,
      orderNumber: "516444512341",
      date: "2021/09/02",
      total: 200,
      items: [
        {
          title: "Produto 2",
          price: 200,
          quantity: 1,
        },
      ],
    },
  ];
  return (
    <Box mt="2rem" width="100%" p="2rem">
      <Flex alignItems="center" gap="2rem">
        <Icon color="black.500" w="4rem" h="4rem" as={CiShoppingBasket} />
        <Heading>Meus pedidos</Heading>
      </Flex>
      <Flex
        borderRadius="2rem"
        p="2rem"
        bg="brand.50"
        flexDir="column"
        rowGap={4}
        mt="2rem"
      >
        {orders.map((order: OrderType) => (
          <Order key={order.id} order={order} />
        ))}
        {pathname !== "/basket" && (
          <Box textAlign="right" mt="1rem">
            <Button
              colorScheme="brand"
              rounded="full"
              onClick={() => router.push("/basket")}
            >
              Ver mais
            </Button>
          </Box>
        )}
      </Flex>
    </Box>
  );
}
