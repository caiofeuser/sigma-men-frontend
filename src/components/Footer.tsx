import { useState, useEffect, createContext, useContext } from "react";
import {
  Box,
  Flex,
  Text,
  Icon,
  Grid,
  GridItem,
  Button,
} from "@chakra-ui/react";
import { QuestionIcon, PhoneIcon, AtSignIcon } from "@chakra-ui/icons";
import { AiFillInstagram } from "react-icons/ai";
import { RiMapPin2Line } from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";
import api from "@/api/api";
import { ContactInformationType, ContactInfo } from "@/types/index";
import { useRouter } from "next/navigation";
// Create a context to store the button status
const ButtonStatusContext = createContext({ isPartnershipAvailable: false });

// Custom hook to access the button status context
const useButtonStatus = () => useContext(ButtonStatusContext);

export default function Footer() {
  const { getPartnershipStatus, getContactInfo } = api();
  const Year = new Date().getFullYear();
  const [isPartnershipAvailable, setIsPartnershipAvailable] = useState(false);
  const [contact, setContact] = useState<ContactInfo[]>([]);

  const pages = [
    { name: "Home", href: "/" },
    { name: "Quem somos", href: "/about" },
    { name: "Perguntas frequentes", href: "/faq" },
    { name: "Saiba mais", href: "/more" },
  ];

  const contactMap = [
    {
      name: "Telefone",
      href: "google.com",
      icon: <PhoneIcon />,
      content: "(47) 3555-2345",
      key: "phone",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com",
      icon: <Icon as={AiFillInstagram} />,
      content: "@instagram",
      key: "instagram",
    },
    {
      name: "E-mail",
      href: "google.com",
      icon: <AtSignIcon />,
      content: "sigma@men.com",
      key: "email",
    },
    {
      name: "Endereço",
      href: "google.com",
      icon: <Icon as={RiMapPin2Line} />,
      content: "Jaraguá do Sul - SC",
      key: "address",
    },
  ];

  useEffect(() => {
    // Fetch the button status only once when the component mounts
    getPartnershipStatus().then((response) => {
      setIsPartnershipAvailable(response.data.display_button);
    });

    getContactInfo().then((response) => {
      handleContactInfo(response.data);
    });
  }, []);

  const teste = {
    phone: "(47) 3535-4242",
    email: "contato@sigmamen.com.br",
    address: "Jaraguá do Sul - xxxxxxxxx - nºyy",
    instragram: "@sigmamen",
  };

  const handleContactInfo = (contactInfo: ContactInformationType) => {
    Object.entries(contactInfo).forEach(([key, value]) => {
      contactMap.map((item) => {
        if (item.key === key) {
          item.content = value;
        }
      });
    });

    setContact(contactMap);
  };

  return (
    <ButtonStatusContext.Provider value={{ isPartnershipAvailable }}>
      <Grid
        paddingY="5rem"
        paddingX="8rem"
        bg="black.500"
        color="white"
        templateColumns="repeat(3, 1fr)"
        gap={6}
      >
        <GridItem w="100%" h="100%">
          <Text mb="1rem" fontSize="3xl">
            Ficou alguma dúvida?
          </Text>
          <Flex gap={4} alignItems="center">
            <QuestionIcon />
            <Text fontSize="1xl">Visite nossa central de ajuda</Text>
          </Flex>
        </GridItem>
        <GridItem margin="auto" h="100%">
          <Text fontSize="3xl" mb="1rem">
            Nossos contatos:
          </Text>
          <Flex flexDir="column" gap={4}>
            {contact?.map((item) => (
              <Flex key={item.name} gap={4} alignItems="center">
                {item.icon}
                <Link href={item.href}>
                  <Flex columnGap="1rem">
                    <Text>{item.name}:</Text>
                    <Text>{item.content}</Text>
                  </Flex>
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
          <FooterButton />
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
    </ButtonStatusContext.Provider>
  );
}

// Separate component for rendering the button
function FooterButton() {
  const { isPartnershipAvailable } = useButtonStatus();
  const router = useRouter();
  return (
    <>
      {isPartnershipAvailable && (
        <Flex justifyContent="center" alignItems="center" gap={4} mt={24}>
          <Button
            bg="black.100"
            textColor="white"
            _hover={{ background: "var(--chakra-colors-brand-700)" }}
            size="lg"
            onClick={() => router.push("/work-with-us")}
          >
            Seja um parceiro
          </Button>
        </Flex>
      )}
    </>
  );
}
