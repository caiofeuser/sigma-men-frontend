import React from "react";
import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

export default function AlertAuth(props: { isVisible: boolean }) {
  const { isVisible } = props;
  return (
    isVisible && (
      <Alert
        status="warning"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Por favor, pata continuar comprando confirme seu e-mail!
        </AlertTitle>
      </Alert>
    )
  );
}
