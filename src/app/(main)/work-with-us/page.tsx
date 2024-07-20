"use client";
import { Suspense } from "react";
import {
  Box,
  Heading,
  Flex,
  Text,
  List,
  ListItem,
  ListIcon,
  Icon,
} from "@chakra-ui/react";
import { PhoneIcon, AtSignIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { AiFillInstagram } from "react-icons/ai";
import { RiMapPin2Line } from "react-icons/ri";

export default function WorkWithUs() {
  const contactMap = [
    {
      name: "Telefone",
      href: "google.com",
      icon: PhoneIcon,
      content: "(47) 3555-2345",
      key: "phone",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com",
      icon: AiFillInstagram,
      content: "@instagram",
      key: "instagram",
    },
    {
      name: "E-mail",
      href: "google.com",
      icon: AtSignIcon,
      content: "sigma@men.com",
      key: "email",
    },
    {
      name: "Endereço",
      href: "google.com",
      icon: RiMapPin2Line,
      content: "Jaraguá do Sul - SC",
      key: "address",
    },
  ];

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Flex mx={16} mt="132px" justifyContent="center">
        <Flex justifyContent="center" flexDir="column" rowGap={16}>
          <Heading>
            Trabalhe{" "}
            <span
              style={{
                color: "var(--chakra-colors-brand-500)",
                fontWeight: "bold",
              }}
            >
              conosco!
            </span>
          </Heading>
          <Flex justifyContent="center" flexDir="column" mb={24} mx={8}>
            <Text textAlign="center" as="b" fontSize="2xl" pb={8}>
              Vantagens
            </Text>
            <List spacing={4} mb={16}>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="brand.500" />
                Vantagem 1
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="brand.500" />
                Vantagem 2
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="brand.500" />
                Vantagem 3
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="brand.500" />
                Vantagem 4
              </ListItem>
            </List>
            <Text as="b" textAlign="center" fontSize="2xl" pb={8}>
              Contatos
            </Text>
            <List spacing={4}>
              {contactMap.map((item) => (
                <ListItem key={item.key}>
                  <ListIcon as={item.icon} color="brand.500" />
                  {item.content}
                </ListItem>
              ))}
            </List>
          </Flex>
        </Flex>
      </Flex>
    </Suspense>
  );
}
