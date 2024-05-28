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
  Grid,
  GridItem,
  Tooltip,
} from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";

import { useState } from "react";
interface OrderType {
  order: {
    id: number;
    date: string;
    amount_total: number;
    orderNumber: string;
    items: {
      name: string;
      price: number;
      quantity: number;
    }[];
  };
}

const totalQuantity = (order: any) => {
  const quantity = order.line_items.data.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  return quantity;
};

const handleTranslatePaymentStatus = (status: string) => {
  switch (status) {
    case "paid":
      return "Pago";
    case "unpaid":
      return "Não pago";
    case "no_payment_required":
      return "Sem pagamento necessário";
    default:
      return "Não pago";
  }
};
export default function Order(props: OrderType) {
  const [showDetails, setShowDetails] = useState(false);
  const [isShowingWholeOrderID, setIsShowingWholeOrderID] = useState(false);
  const { order } = props;
  return (
    <Box
      key={props.order.id}
      bg="gray.50"
      borderRadius="1.2rem"
      p="1rem"
      m="1rem"
    >
      <Flex alignItems="center">
        <Grid
          width="100%"
          justifyItems="stretch"
          templateColumns="repeat(4, 1fr)"
        >
          <GridItem
            p="1rem"
            onClick={() => setIsShowingWholeOrderID((prev) => !prev)}
          >
            <Tooltip label="Clique para revelar o código inteiro">
              <Text
                maxW={isShowingWholeOrderID ? "fit-content" : "300px"}
                textOverflow="ellipsis"
                overflow="hidden"
                whiteSpace="nowrap"
              >
                {order.id}
              </Text>
            </Tooltip>
          </GridItem>
          <GridItem p="1rem">
            <Text>{order.date}</Text>
          </GridItem>
          <GridItem p="1rem">
            <Text>R$ {order.amount_total}</Text>
          </GridItem>
          <GridItem p="1rem">
            <Text>{handleTranslatePaymentStatus(order.payment_status)}</Text>
          </GridItem>
        </Grid>
        <IconButton
          color="brand.500"
          variant="ghost"
          textAlign="center"
          borderRadius="full"
          onClick={() => setShowDetails(!showDetails)}
          w="2rem"
          aria-label="Mostrar resposta"
          icon={
            showDetails ? (
              <ChevronUpIcon borderRadius="full" boxSize={8} />
            ) : (
              <ChevronDownIcon boxSize={8} borderRadius="full" />
            )
          }
        />
      </Flex>
      <Collapse in={showDetails}>
        <Flex m="2rem" flexDir="column" alignItems="center">
          <TableContainer w="100%">
            <Table colorScheme="brand">
              <Thead>
                <Tr>
                  <Th>Produto</Th>
                  <Th isNumeric>Quantidade</Th>
                  <Th isNumeric>Preço</Th>
                </Tr>
              </Thead>
              <Tbody>
                {order.line_items.data.map((item, index) => (
                  <Tr key={index}>
                    <Td>{item.description}</Td>
                    <Td isNumeric>{item.quantity}</Td>
                    <Td isNumeric>R$ {item.amount_total}</Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr pt="1rem">
                  <Th>Total</Th>
                  <Th isNumeric>{totalQuantity(order)}</Th>
                  <Th isNumeric>R$ {order.amount_total}</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Flex>
      </Collapse>
    </Box>
  );
}
