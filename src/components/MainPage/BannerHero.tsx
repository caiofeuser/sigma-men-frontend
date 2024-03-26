import { Box, Button, Heading, Text, Icon } from "@chakra-ui/react";
import { CgPill } from "react-icons/cg";
import { LuEyeOff } from "react-icons/lu";
import { BsPrescription2 } from "react-icons/bs";
import { Search2Icon } from "@chakra-ui/icons";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BannerHero() {
  const router = useRouter();
  const content = [
    {
      name: "Tratamentos customizados",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt dignissim lorem et feugiat. Suspendisse lacus nisl, bibendum fringilla dui quis, vehicula ullamcorper est",
      icon: CgPill,
    },
    {
      name: "Discreto, 100% online",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt dignissim lorem et feugiat. Suspendisse lacus nisl, bibendum fringilla dui quis, vehicula ullamcorper est",
      icon: LuEyeOff,
    },
    {
      name: "Receita personalizada",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt dignissim lorem et feugiat. Suspendisse lacus nisl, bibendum fringilla dui quis, vehicula ullamcorper est",
      icon: BsPrescription2,
    },
  ];
  return (
    <Box bg="brand.50">
      <div style={{ display: "flex", gap: 8, justifyContent: "space-evenly" }}>
        <div style={{ width: "50%", padding: "3rem 6rem 1rem 6rem" }}>
          <Heading as="b" fontSize="6xl" sx={{ lineHeight: "68px" }}>
            Tratamentos para{" "}
            <span style={{ color: "var(--chakra-colors-brand-500)" }}>
              saúde
            </span>{" "}
            masculina
          </Heading>
          <Text style={{ fontWeight: "300", marginTop: "3rem" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            tincidunt dignissim lorem et feugiat. Suspendisse lacus nisl,
            bibendum fringilla dui quis, vehicula ullamcorper est. Nam in
            tincidunt turpis. Nulla facilisi. Vivamus ipsum mi, vehicula sit
            amet eros at, commodo elementum est. Sed egestas pellentesque neque
            ac tincidunt. Vivamus ut justo finibus, laoreet urna a, pretium
            purus. Ut elit tortor, suscipit nec tortor nec, auctor scelerisque
            ex. Maecenas odio enim, tempus id massa id, aliquam elementum massa.
            Curabitur nec commodo tellus. Donec accumsan est ipsum, in elementum
            enim ornare ut. Pellentesque a velit malesuada, luctus ante ut,
            finibus augue. Phasellus vel convallis mauris. Mauris vitae diam
            eget est ultrices molestie vel eu urna. Sed cursus nunc ut eleifend
            auctor.
          </Text>
        </div>
        <div style={{ padding: "3rem 6rem 1rem 6rem", width: "60%" }}>
          {content.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "2rem",
                marginBottom: "2rem",
                width: "fit-content",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  borderRadius: "50%",
                  minHeight: "4rem",
                  minWidth: "4rem",
                  maxHeight: "4rem",
                  maxWidth: "4rem",
                  background: "var(--chakra-colors-brand-500)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon height={8} width={8} as={CgPill} />
              </div>

              <div style={{ width: "70%", display: "flex", gap: "1rem" }}>
                <div
                  style={{
                    minHeight: "100%",
                    minWidth: "0.5rem",
                    background: "var(--chakra-colors-brand-500)",
                    borderRadius: "10px",
                  }}
                />
                <div>
                  <Heading fontSize="4xl" as="b">
                    {item.name}
                  </Heading>
                  <Text style={{ fontWeight: "300" }} mt={2}>
                    {item.description}
                  </Text>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "2rem",
        }}
      >
        <Button
          color="white"
          colorScheme="black"
          borderRadius={32}
          display="flex"
          gap={8}
          padding="2rem 4rem"
          fontSize="1.25rem"
          onClick={() => router.push("/forms")}
        >
          <Search2Icon />
          Conheça nossos tratamentos
        </Button>
      </div>
    </Box>
  );
}
