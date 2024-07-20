"use client";
import { useState, Suspense } from "react";
import {
  Box,
  Heading,
  Flex,
  Input,
  Button,
  InputGroup,
  IconButton,
  InputRightElement,
} from "@chakra-ui/react";
import { Icon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { RiLoginCircleFill } from "react-icons/ri";

export default function ChangePassword() {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
  const [showNewPasswordConfirmation, setShowNewPasswordConfirmation] =
    useState(false);

  const handleSubmit = () => {};
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Flex justifyContent="center">
        <Box
          bg="white"
          padding="4rem"
          maxW="40rem"
          minW="35rem"
          borderRadius="2rem"
          mt="2rem"
        >
          <Box mb="2rem">
            <Heading mb="1rem" textAlign="center" fontSize="3xl">
              Recupere sua senha
            </Heading>
          </Box>
          <Box>
            <Input
              mb="2rem"
              focusBorderColor="brand.500"
              colorScheme="brand"
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              h="3rem"
            />
            <InputGroup mb="2rem">
              <Input
                h="3rem"
                colorScheme="brand"
                type={showOldPassword ? "text" : "password"}
                id="password"
                focusBorderColor="brand.500"
                placeholder="Senha antiga"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <InputRightElement display="flex" alignItems="center" h="3rem">
                <IconButton
                  aria-label="Mostrar senha"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  icon={showOldPassword ? <ViewOffIcon /> : <ViewIcon />}
                  colorScheme="brand"
                  size="sm"
                  variant="ghost"
                  rounded="full"
                  alignContent="center"
                />
              </InputRightElement>
            </InputGroup>
            <InputGroup mb="2rem">
              <Input
                h="3rem"
                colorScheme="brand"
                type={showNewPassword ? "text" : "password"}
                id="password"
                focusBorderColor="brand.500"
                placeholder="Nova senha"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <InputRightElement display="flex" alignItems="center" h="3rem">
                <IconButton
                  aria-label="Mostrar senha"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  icon={showNewPassword ? <ViewOffIcon /> : <ViewIcon />}
                  colorScheme="brand"
                  size="sm"
                  variant="ghost"
                  rounded="full"
                  alignContent="center"
                />
              </InputRightElement>
            </InputGroup>
            <InputGroup mb="2rem">
              <Input
                h="3rem"
                colorScheme="brand"
                type={showNewPasswordConfirmation ? "text" : "password"}
                id="password"
                focusBorderColor="brand.500"
                placeholder="Senha"
                value={newPasswordConfirmation}
                onChange={(e) => setNewPasswordConfirmation(e.target.value)}
              />
              <InputRightElement display="flex" alignItems="center" h="3rem">
                <IconButton
                  aria-label="Mostrar senha"
                  onClick={() =>
                    setShowNewPasswordConfirmation(!showNewPasswordConfirmation)
                  }
                  icon={
                    showNewPasswordConfirmation ? <ViewOffIcon /> : <ViewIcon />
                  }
                  colorScheme="brand"
                  size="sm"
                  variant="ghost"
                  rounded="full"
                  alignContent="center"
                />
              </InputRightElement>
            </InputGroup>
          </Box>
          <Flex justifyContent="center">
            <Button
              onClick={() => handleSubmit()}
              colorScheme="black"
              rounded="full"
              w="50%"
              fontWeight="600"
              fontSize="1.25rem"
              h="3rem"
            >
              Alterar senha
              <RiLoginCircleFill
                size="1.25rem"
                color="var(--chakra-colors-brand-500)"
                style={{
                  position: "absolute",
                  right: "1rem",
                }}
              />
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Suspense>
  );
}
