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
} from "@chakra-ui/react";
import { SlBasket } from "react-icons/sl";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { RiLogoutBoxLine } from "react-icons/ri";
import { MdAccountCircle } from "react-icons/md";
import { useState } from "react";
import MenuBasket from "./MenuBasket";
// import { useRouter } from "next/router" ;

interface NavbarProps {
  drawerRef: React.RefObject<HTMLButtonElement>;
  onOpen: () => void;
}

interface basketItems {
  title: string;
  total: number;
  price: number;
  quantity: number;
}

export default function Navbar(props: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [basketItems, setBasketItems] = useState([
    {
      title: "Produto 1",
      total: 100,
      price: 100,
      quantity: 2,
    },
    {
      title: "Produto 2",
      total: 200,
      price: 200,
      quantity: 1,
    },
  ] as basketItems[]);

  //@ts-ignore
  // const TestimonialCard = dynamic(() => import("./TestimonialCard"), {
  //   ssr: false,
  // });

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
      onClick: () => router.push("/logout"),
    },
  ];

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem",
      }}
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
        <Image
          src="/logo.png"
          priority={true}
          width={185}
          height={185}
          alt="logo"
        />
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
