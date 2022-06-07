import { Box, Flex } from "@chakra-ui/react";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/header";
import { Sidebar } from "../../components/sidemenu";

interface PrivateLayoutProps {
  children: ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token-todo");

    if (!token) {
      navigate("/");
    }
  }, []);
  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        {children}
      </Flex>
    </Box>
  );
}
