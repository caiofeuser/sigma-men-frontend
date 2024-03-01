"use client";
import { HamburgerIcon, AddIcon, WarningIcon } from "@chakra-ui/icons";
import { Avatar, IconButton, Text, Icon } from "@chakra-ui/react";
import { SlBasket } from "react-icons/sl";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface NavbarProps {
  drawerRef: React.RefObject<HTMLButtonElement>;
  onOpen: () => void;
}

export default function Navbar(props: NavbarProps) {
  const router = useRouter();
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
        <Avatar
          margin={1}
          color="black"
          size="sm"
          name="Dan Abrahmov"
          src="https://bit.ly/dan-abramov"
        />
      </div>
    </nav>
  );
}
