"use client";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Collapse,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";

import { useState } from "react";
interface OrderType {
  order: {
    id: number;
    date: string;
    total: number;
    orderNumber: string;
    items: {
      name: string;
      price: number;
      quantity: number;
    }[];
  };
}
export default function Order(props: OrderType) {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <Box
      key={props.order.id}
      borderBottom="1px solid var(--chakra-colors-brand-200)"
      textAlign="center"
    >
      <Flex
        justifyContent="center"
        rowGap={8}
        columnGap={4}
        padding="1rem 1rem 0.25rem 1rem"
      >
        <Text as="b">Pedido: {props.order.orderNumber}</Text>
        <Text>{props.order.date}</Text>
        <Text>R$ {props.order.total}</Text>
      </Flex>
      <IconButton
        // bg="white"
        color="brand.500"
        variant="ghost"
        onClick={() => setShowDetails(!showDetails)}
        w="2rem"
        aria-label="Mostrar resposta"
        icon={
          showDetails ? (
            <ChevronUpIcon boxSize={8} />
          ) : (
            <ChevronDownIcon boxSize={8} />
          )
        }
      />
      <Collapse in={showDetails}>
        <Flex flexDir="column" alignItems="center">
          {props.order.items.map((item, index) => (
            <TableContainer w="100%" key={index}>
              <Table colorScheme="brand">
                <Thead>
                  <Tr>
                    <Th>Produto</Th>
                    <Th isNumeric>Quantidade</Th>
                    <Th isNumeric>Preço</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>{item.name}</Td>
                    <Td isNumeric>{item.quantity}</Td>
                    <Td isNumeric>R$ {item.price}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          ))}
        </Flex>
      </Collapse>
    </Box>
  );
}
