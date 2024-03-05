"use client";
import { HamburgerIcon, AddIcon, WarningIcon } from "@chakra-ui/icons";
import { Fragment } from "react";
import {
  Avatar,
  IconButton,
  Text,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  PopoverHeader,
  List,
  Divider,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { SlBasket } from "react-icons/sl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { RiLogoutBoxLine } from "react-icons/ri";
import { MdAccountCircle } from "react-icons/md";

interface NavbarProps {
  drawerRef: React.RefObject<HTMLButtonElement>;
  onOpen: () => void;
}

export default function Navbar(props: NavbarProps) {
  const router = useRouter();

  const popoverItems = [
    {
      title: "Minha conta",
      icon: <Icon color="brand.500" h="24px" w="24px" as={MdAccountCircle} />,
      onClick: () => router.push("/profile"),
    },
    {
      title: "Carrinho",
      icon: (
        <Icon
          as={SlBasket}
          color="brand.500"
          h="24px"
          w="24px"
          style={{ width: "1.5rem" }}
        />
      ),
      onClick: () => router.push("/cart"),
    },
    {
      title: "Sair",
      icon: <Icon h="24px" w="24px" color="brand.500" as={RiLogoutBoxLine} />,
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
        <Image src="/logo.png" width={185} height={185} alt="logo" />
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
        <IconButton
          aria-label="Open basket"
          isRound={true}
          variant="ghost"
          color="black"
          icon={<SlBasket size="24" style={{ width: "1.5rem" }} />}
        />
        <Popover>
          <PopoverTrigger>
            <Avatar
              cursor="pointer"
              margin={1}
              color="black"
              size="sm"
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader fontWeight="semibold">Olá, Dan!</PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              <List>
                {popoverItems.map((item) => (
                  <Fragment key={item.title}>
                    <ListItem
                      _hover={{ background: "brand.50" }}
                      borderRadius="1rem"
                      cursor="pointer"
                      display="flex"
                      alignItems="center"
                      onClick={item.onClick}
                      justifyContent="flex-start"
                      gap="1rem"
                      padding="1rem 1rem 1rem 0.5rem"
                    >
                      {item.icon}
                      {item.title}
                    </ListItem>
                    <Divider />
                  </Fragment>
                ))}
              </List>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
}
