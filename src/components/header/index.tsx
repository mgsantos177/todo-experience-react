import {
  Flex,
  Icon,
  IconButton,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useContext } from "react";
import { RiLogoutBoxLine, RiMenuLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";

export function Header() {
  const { onOpen } = useSidebarDrawer();
  const { signOut } = useContext(AuthContext);
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1300}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
      boxShadow="0 2px 0 rgb(0 0 0 / 10%)"
      justify="space-between"
    >
      {!isWideVersion && (
        <IconButton
          aria-label="Open navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
        />
      )}
      <Link to="/home">
        <Text
          fontSize={["20px", "25px", "30px"]}
          fontWeight="bold"
          letterSpacing="tight"
          w="256px"
        >
          todo-app
        </Text>
      </Link>

      <IconButton
        aria-label="Open navigation"
        icon={<Icon as={RiLogoutBoxLine} />}
        fontSize="24"
        variant="outline"
        onClick={signOut}
      />
    </Flex>
  );
}
