"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "./providers";
import { useRef } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Heading,
  ListItem,
  UnorderedList,
  Flex,
  Text,
  Box,
  Divider,
  Avatar,
} from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const drawerRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const treatments = [
    { title: "Queda de cabelo" },
    { title: "Disfunção erétil" },
    { title: "Sono" },
    { title: "Perda de peso" },
  ];

  const suportLinks = [
    { title: "Central de ajuda" },
    { title: "FAQ" },
    { title: "Contatos" },
  ];
  // <!DOCTYPE html>
  // <html lang="en">
  // <head>
  //   <meta charset="UTF-8" />
  //   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  //   <title>Document</title>
  // </head>
  // <body>

  // </body>
  // </html>

  return (
    <html suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        <div>
          <Providers>
            <Navbar onOpen={onOpen} drawerRef={drawerRef} />
            <Drawer
              isOpen={isOpen}
              placement="left"
              onClose={onClose}
              finalFocusRef={drawerRef}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerBody mt="2rem">
                  <Box mb="4rem">
                    <Heading size="md">Tratamentos</Heading>
                    <Flex flexDir="column" mt="1rem">
                      <UnorderedList
                        color="brand.500"
                        style={{ marginLeft: "2rem" }}
                      >
                        {treatments.map((treatment, index) => (
                          <ListItem key={index} mt="1.5rem">
                            <Text color="#000">{treatment.title}</Text>
                          </ListItem>
                        ))}
                      </UnorderedList>
                    </Flex>
                  </Box>
                  <Divider />
                  <Box mt="4rem">
                    <Heading size="md">Suporte</Heading>
                    <Flex flexDir="column" mt="1rem">
                      <UnorderedList
                        color="brand.500"
                        style={{ marginLeft: "2rem" }}
                      >
                        {suportLinks.map((treatment, index) => (
                          <ListItem key={index} mt="1.5rem">
                            <Text color="#000">{treatment.title}</Text>
                          </ListItem>
                        ))}
                      </UnorderedList>
                    </Flex>
                  </Box>
                </DrawerBody>

                <DrawerFooter>
                  <Flex alignItems="center" justifyContent="center" gap="1rem">
                    <Text as="b">Sua conta, Usuário</Text>
                    <Avatar
                      margin={1}
                      color="black"
                      size="sm"
                      name="Dan Abrahmov"
                      src="https://bit.ly/dan-abramov"
                    />
                  </Flex>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
            {children}
          </Providers>
        </div>
      </body>
    </html>
  );
}
