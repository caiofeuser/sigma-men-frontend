import { Text, Box, Button, Heading, Icon } from "@chakra-ui/react";
import Image from "next/image";
import { FaCirclePlus } from "react-icons/fa6";

export default function TreatmentCard(props: { title: string }) {
  return (
    <Box
      ml="0.75rem"
      bg="beige"
      style={{
        minHeight: "17rem",
        minWidth: "27rem",
        borderRadius: "0rem 2rem 2rem 0rem",
        display: "flex",
      }}
    >
      <div
        style={{
          minHeight: "100%",
          minWidth: "0.5rem",
          background: "var(--chakra-colors-brand-500)",
          borderRadius: "10px",
        }}
      />
      <div
        style={{
          padding: "3rem",
          display: "flex",
          flexDirection: "column",
          rowGap: "1rem",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Heading fontSize="4xl">{props.title}</Heading>
        <Image src="/cardImg.png" alt="hero" width={300} height={300} />
        <Button
          variant="solid"
          color="white"
          colorScheme="black"
          borderRadius="3rem"
          style={{
            width: "100%",
            display: "flex",
            gap: "1.5rem",
            marginTop: "1rem",
            minHeight: "3rem",
          }}
          fontSize="1.25rem"
        >
          <Icon color="brand.500" as={FaCirclePlus} />
          Saiba mais
        </Button>
      </div>
    </Box>
  );
}
