import { Box, Flex, Text, Icon, Grid, GridItem } from "@chakra-ui/react";
import { QuestionIcon, PhoneIcon, AtSignIcon } from "@chakra-ui/icons";
import { AiFillInstagram } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const Year = new Date().getFullYear();
  const pages = [
    { name: "Home", href: "/" },
    { name: "Quem somos", href: "/about" },
    { name: "Perguntas frequentes", href: "/faq" },
    { name: "Saiba mais", href: "/more" },
  ];

  const contact = [
    { name: "Telefone", href: "google.com", icon: <PhoneIcon /> },
    {
      name: "Instagram",
      href: "https://www.instagram.com",
      icon: <Icon as={AiFillInstagram} />,
    },
    { name: "E-mail", href: "google.com", icon: <AtSignIcon /> },
  ];
  return (
    <>
      <Grid
        paddingY="5rem"
        paddingX="8rem"
        bg="black"
        color="white"
        templateColumns="repeat(3, 1fr)"
        gap={6}
      >
        <GridItem w="100%" h="100%">
          <Text fontSize="3xl">Ficou alguma dúvida?</Text>
          <Flex gap={4} alignItems="center">
            <QuestionIcon />
            <Text fontSize="1xl">Visite nossa central de ajuda</Text>
          </Flex>
        </GridItem>
        <GridItem margin="auto" h="100%">
          <Text fontSize="3xl">Nossos contatos:</Text>
          <Flex flexDir="column" gap={4}>
            {contact.map((item) => (
              <Flex key={item.name} gap={4} alignItems="center">
                {item.icon}
                <Link href={item.href}>
                  <Text>{item.name}</Text>
                </Link>
              </Flex>
            ))}
          </Flex>
        </GridItem>
        <GridItem w="100%" h="100%">
          <Flex justifyContent="flex-end">
            <Flex flexDir="column" rowGap={3}>
              <div>
                <Image
                  style={{ filter: "invert(1)" }}
                  src="/logo.png"
                  alt="logo"
                  height={73}
                  width={185}
                />
              </div>
              {pages.map((page) => (
                <Link key={page.name} href={page.href}>
                  <Text>{page.name}</Text>
                </Link>
              ))}
            </Flex>
          </Flex>
        </GridItem>
        <GridItem
          w="100%"
          h="100%"
          colSpan={3}
          display="flex"
          flexDir="column"
          alignItems="center"
        >
          <div
            style={{
              background: "white",
              height: "0.5px",
              width: "80%",
              opacity: 0.5,
              marginTop: "4rem",
              marginBottom: "6rem",
            }}
          />
          <Text fontSize="1.25rem">Todos os direitos reservados</Text>
          <Text fontSize="1.25rem">© {Year}</Text>
        </GridItem>
      </Grid>
    </>
  );
}
