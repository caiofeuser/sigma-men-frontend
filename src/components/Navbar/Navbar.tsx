"use client";
import {
  HamburgerIcon,
  AddIcon,
  MinusIcon,
  DeleteIcon,
  WarningIcon,
} from "@chakra-ui/icons";
import { Fragment } from "react";
import { IoMdAddCircle } from "react-icons/io";
import {
  Avatar,
  IconButton,
  Text,
  Icon,
  Flex,
  Menu,
  MenuList,
  MenuGroup,
  MenuDivider,
  MenuItem,
  MenuButton,
  Box,
  Button,
  Fade,
} from "@chakra-ui/react";
import { SlBasket } from "react-icons/sl";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { RiLogoutBoxLine } from "react-icons/ri";
import { MdAccountCircle } from "react-icons/md";
import MenuBasket from "./MenuCart";
import { useNavbarContext } from "@/context/navbar";
// import { useRouter } from "next/router" ;

interface NavbarProps {
  drawerRef: React.RefObject<HTMLButtonElement>;
  onOpen: () => void;
  isNavbarVisible: boolean;
}

export default function Navbar(props: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isNavbarVisible } = useNavbarContext();

  const menuItems = [
    {
      title: "Minha conta",
      icon: <Icon color="black.500" h="24px" w="24px" as={MdAccountCircle} />,
      onClick: () => router.push("/profile"),
    },
    {
      title: "Carrinho",
      icon: (
        <Icon
          as={SlBasket}
          color="black.500"
          h="24px"
          w="24px"
          style={{ width: "1.5rem" }}
        />
      ),
      onClick: () => router.push("/cart"),
    },
    {
      title: "Sair",
      icon: <Icon h="24px" w="24px" color="black.500" as={RiLogoutBoxLine} />,
      onClick: () => router.push("/login"),
    },
  ];

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem 1rem 1rem 1rem",
        position: "fixed", // Adiciona posição fixa para a barra de navegação
        top: 0, // Fixa a barra de navegação no topo da tela
        left: 0, // Alinha a barra de navegação à esquerda
        right: 0, // Alinha a barra de navegação à direita
        zIndex: 999, // Garante que a barra de navegação fique sobre outros elementos
        backgroundColor: "white",
        minHeight: "95px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }} // Adiciona uma cor de fundo (altere conforme necessário)
      suppressHydrationWarning
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "30%",
          justifyContent: "flex-start",
          gap: "2rem",
        }}
      >
        <IconButton
          isRound={true}
          aria-label="Open menu"
          icon={<HamburgerIcon boxSize={6} />}
          variant="ghost"
          color="black"
          ref={props.drawerRef}
          onClick={() => {
            props.onOpen();
            // prevent weirds behavior of chakra-ui Drawer that add margin-right to body
            document.body.setAttribute("style", "margin-right: 0 !important");
          }}
        />
        <Text color="black" as="b">
          Ferramentas
        </Text>
      </div>
      <div
        onClick={() => router.push("/")}
        style={{
          display: "flex",
          width: "30%",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <div style={{ position: "absolute", top: "1rem" }}>
          <Fade in={isNavbarVisible} transition={{ enter: { duration: 2 } }}>
            <div style={{ maxHeight: "63px" }}>
              <Image src="/e.png" width={38} height={73} alt="logo" />
            </div>
          </Fade>
        </div>
        <div style={{ position: "absolute", top: "1rem" }}>
          <Fade in={!isNavbarVisible} transition={{ enter: { duration: 2 } }}>
            <div style={{ maxHeight: "63px" }}>
              <Image src="/logo.png" width={185} height={73} alt="logo" />
            </div>
          </Fade>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "30%",
          justifyContent: "flex-end",
          gap: "2rem",
        }}
      >
        {pathname === "/login" ||
        pathname === "/register" ||
        pathname === "/forgot-password" ? null : (
          <>
            <MenuBasket />
            <Menu>
              <MenuButton>
                <Avatar
                  cursor="pointer"
                  margin={1}
                  color="black"
                  size="sm"
                  name="Dan Abrahmov"
                  src="https://bit.ly/dan-abramov"
                />
              </MenuButton>
              <MenuList>
                <MenuGroup fontWeight="semibold" title="Perfil" />
                {menuItems.map((item) => (
                  <Fragment key={item.title}>
                    <MenuItem
                      _hover={{ bg: "gray.100" }}
                      icon={item.icon}
                      cursor="pointer"
                      onClick={item.onClick}
                      py={2}
                    >
                      {item.title}
                    </MenuItem>
                  </Fragment>
                ))}
                <MenuGroup title="Ajuda">
                  <MenuDivider />
                  <MenuItem
                    icon={<WarningIcon h="18px" w="18px" />}
                    onClick={() => router.push("/help")}
                  >
                    Ajuda
                  </MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </>
        )}
      </div>
    </nav>
  );
}
