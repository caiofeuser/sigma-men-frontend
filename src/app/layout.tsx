"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { RiLogoutCircleFill, RiLoginCircleFill } from "react-icons/ri";
import { Providers } from "./providers";
import { useEffect, useRef, useState } from "react";
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
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { CartWrapper } from "@/context/cart";
import { NavabarWrapper } from "@/context/navbar";
import { FormsIndexWrapper } from "@/context/forms";
import { AuthWrapper, useAuth } from "@/context/authentication";
import AlertAuth from "@/components/MainPage/AlertAuth";
import { AuthTokens, User } from "@/types";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const drawerRef = useRef(null);
  const params = useSearchParams();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
  // const code = params.get("code") || "";
  const { user } = useAuth();

  const logout = () => {
    localStorage.removeItem("aceessToken");
    localStorage.removeItem("refreshToken");
    router.push("/");
  };

  const treatments = [
    { name: "Queda de cabelo" },
    { name: "Disfunção erétil" },
    { name: "Sono" },
    { name: "Perda de peso" },
  ];

  const suportLinks = [
    { name: "Central de ajuda" },
    { name: "FAQ" },
    { name: "Contatos" },
  ];

  // const verifyEmail = async (token: string) => {
  //   if (accessToken) {
  //     const response = await fetch(
  //       `http://localhost:8000/auth_api/user/is-verified/`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     const data = await response.json();
  //     if (response.status === 400) {
  //       setIsAlertVisible(true);
  //       setTimeout(() => {
  //         setIsAlertVisible(false);
  //       }, 5000);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (authToken) {
  //     verifyEmail(authToken.access);
  //   }
  // }, [authToken]);

  return (
    <html suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        <div>
          <AuthWrapper>
            <Providers>
              <NavabarWrapper>
                <FormsIndexWrapper>
                  <CartWrapper>
                    <Navbar
                      onOpen={onOpen}
                      drawerRef={drawerRef}
                      isNavbarVisible={isNavbarVisible}
                    />
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
                                    <Text color="#000">{treatment.name}</Text>
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
                                    <Text color="#000">{treatment.name}</Text>
                                  </ListItem>
                                ))}
                              </UnorderedList>
                            </Flex>
                          </Box>
                        </DrawerBody>
                        <DrawerFooter>
                          <Flex flexDir="column" rowGap="1rem">
                            <Flex
                              alignItems="center"
                              justifyContent="center"
                              gap="1rem"
                            >
                              {user && (
                                <>
                                  <Text as="b">
                                    Sua conta,
                                    {user.first_name}
                                  </Text>
                                  <Avatar
                                    mr="1rem"
                                    color="white"
                                    bg="brand.500"
                                    size="sm"
                                    name={user.first_name}
                                    onClick={() => router.push("/profile")}
                                  />
                                </>
                              )}
                            </Flex>
                            <Box textAlign="right">
                              <Button
                                colorScheme="brand"
                                onClick={() => {
                                  if (user) {
                                    logout();
                                    onClose();
                                  } else {
                                    // router.push("/login");
                                    onClose();
                                  }
                                }}
                                leftIcon={
                                  user ? (
                                    <RiLogoutCircleFill />
                                  ) : (
                                    <RiLoginCircleFill />
                                  )
                                }
                                rounded="full"
                                variant="ghost"
                              >
                                {user ? "Sair" : "Entrar"}
                              </Button>
                            </Box>
                          </Flex>
                        </DrawerFooter>
                      </DrawerContent>
                    </Drawer>
                    <div style={{ marginTop: "95px", transition: "all" }}>
                      <AlertAuth isVisible={isAlertVisible} />
                      {children}
                    </div>
                  </CartWrapper>
                </FormsIndexWrapper>
              </NavabarWrapper>
            </Providers>
          </AuthWrapper>
        </div>
      </body>
    </html>
  );
}
